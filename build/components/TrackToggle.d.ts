import React from 'react';
import { ToggleSource } from '@livekit/components-core';
export interface TrackToggleProps {
    source: ToggleSource;
    showIcon?: boolean;
    className?: string;
    onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}
export declare function TrackToggle({ source, showIcon, className, onClick }: TrackToggleProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TrackToggle.d.ts.map