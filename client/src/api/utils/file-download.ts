import { Observable, tap } from "rxjs";

export function downloadFile(blob: Blob, filename: string, mimeType?: string): void {

    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL
    window.URL.revokeObjectURL(url);
}

export function downloadFileOperator<T extends Blob>(filename: string | ((blob: T) => string), mimeType?: string): (source: Observable<T>) => Observable<T> {

    return (source: Observable<T>) => {
        return source.pipe(
            tap((blob: T) => {
                const actualFilename = typeof filename === 'function' ? filename(blob) : filename;
                downloadFile(blob, actualFilename, mimeType);
            })
        );
    };
}

export function extractFilenameFromContentDisposition(contentDisposition: string | null, fallbackFilename: string = "download"): string {

    if (!contentDisposition) {
        return fallbackFilename;
    }

    // Try to extract filename from Content-Disposition header
    // Supports both "filename=" and "filename*=" formats
    const filenameMatch = contentDisposition.match(/filename\*?=['"]?([^'"\n;]+)['"]?/i);

    if (filenameMatch && filenameMatch[1]) {
        // Decode if it's RFC 5987 encoded (filename*=UTF-8''...)
        const filename = filenameMatch[1];
        if (filename.includes("''")) {
            const parts = filename.split("''");
            if (parts.length === 2) {
                try {
                    return decodeURIComponent(parts[1]);
                } catch {
                    return parts[1];
                }
            }
        }
        return filename;
    }

    return fallbackFilename;
}
