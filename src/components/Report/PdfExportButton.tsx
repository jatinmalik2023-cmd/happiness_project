import { useState, RefObject } from 'react';
import './PdfExportButton.css';

interface Props {
  targetRef: RefObject<HTMLDivElement | null>;
  userName: string;
}

/**
 * Inline computed styles onto every element inside an SVG clone.
 * This ensures CSS-animated properties (like opacity from fadeIn)
 * are baked into the serialized SVG, since external stylesheets
 * won't apply when the SVG is rendered as a standalone image.
 */
function inlineComputedStyles(original: SVGSVGElement, clone: SVGSVGElement) {
  const origElements = original.querySelectorAll('*');
  const cloneElements = clone.querySelectorAll('*');

  const importantProps = [
    'opacity', 'fill', 'stroke', 'stroke-width', 'stroke-opacity',
    'fill-opacity', 'font-family', 'font-size', 'font-weight',
    'text-anchor', 'visibility', 'display',
  ];

  for (let i = 0; i < origElements.length; i++) {
    const origEl = origElements[i];
    const cloneEl = cloneElements[i];
    if (!cloneEl) continue;

    const computed = window.getComputedStyle(origEl);
    for (const prop of importantProps) {
      const val = computed.getPropertyValue(prop);
      if (val) {
        (cloneEl as SVGElement).style.setProperty(prop, val);
      }
    }
  }

  // Also inline styles on the root SVG itself
  const rootComputed = window.getComputedStyle(original);
  for (const prop of importantProps) {
    const val = rootComputed.getPropertyValue(prop);
    if (val) {
      clone.style.setProperty(prop, val);
    }
  }
}

/** Convert all SVGs inside an element to rasterized <img> tags for html2canvas compatibility */
async function rasterizeSvgs(container: HTMLElement): Promise<Array<{ img: HTMLImageElement; svg: SVGSVGElement; parent: Node }>> {
  const svgs = Array.from(container.querySelectorAll('svg'));
  const replacements: Array<{ img: HTMLImageElement; svg: SVGSVGElement; parent: Node }> = [];

  for (const svg of svgs) {
    const parent = svg.parentNode;
    if (!parent) continue;

    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    const scale = 3; // 3x for crisp rendering in PDF
    const width = rect.width * scale;
    const height = rect.height * scale;

    // Clone SVG and inline all computed styles
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('width', String(width));
    clone.setAttribute('height', String(height));
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    if (!clone.getAttribute('viewBox')) {
      clone.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    }

    // Inline computed styles so animated opacity values are captured
    inlineComputedStyles(svg, clone);

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clone);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    await new Promise<void>((resolve) => {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height);
        URL.revokeObjectURL(url);
        resolve();
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      image.src = url;
    });

    const dataUrl = canvas.toDataURL('image/png');
    const img = document.createElement('img');
    img.src = dataUrl;
    img.style.width = `${rect.width}px`;
    img.style.height = `${rect.height}px`;
    img.style.display = 'block';
    img.style.margin = '0 auto';

    parent.replaceChild(img, svg);
    replacements.push({ img, svg, parent });
  }

  return replacements;
}

/** Restore original SVGs after PDF export */
function restoreSvgs(replacements: Array<{ img: HTMLImageElement; svg: SVGSVGElement; parent: Node }>) {
  for (const { img, svg, parent } of replacements) {
    if (img.parentNode === parent) {
      parent.replaceChild(svg, img);
    }
  }
}

export default function PdfExportButton({ targetRef, userName }: Props) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!targetRef.current || isExporting) return;

    setIsExporting(true);
    let svgReplacements: Array<{ img: HTMLImageElement; svg: SVGSVGElement; parent: Node }> = [];

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const filename = userName ? `${userName.toLowerCase()}-ikigai-report.pdf` : 'ikigai-report.pdf';

      // Add PDF-rendering class for darker text during capture
      targetRef.current.classList.add('pdf-rendering');

      // Wait a tick for styles to apply before rasterizing
      await new Promise(r => setTimeout(r, 100));

      // Rasterize SVGs so html2canvas can render them properly
      svgReplacements = await rasterizeSvgs(targetRef.current);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (html2pdf() as any)
        .set({
          margin: [8, 8],
          filename,
          image: { type: 'png', quality: 1 },
          html2canvas: { scale: 2.5, useCORS: true, logging: false, allowTaint: true, backgroundColor: '#FFFFFF' },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['css', 'legacy'] },
        })
        .from(targetRef.current)
        .save();
    } catch (err) {
      console.error('PDF export failed:', err);
    }

    // Restore original SVGs and remove PDF class
    restoreSvgs(svgReplacements);
    targetRef.current?.classList.remove('pdf-rendering');
    setIsExporting(false);
  };

  return (
    <button className="pdf-btn" onClick={handleExport} disabled={isExporting}>
      {isExporting ? (
        <>
          <span className="pdf-btn__spinner" />
          Generating PDF...
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download PDF Report
        </>
      )}
    </button>
  );
}
