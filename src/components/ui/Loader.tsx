import { ClassValue } from 'clsx';

import { cxTw } from '@/commons/utils';

type LoaderProps = {
    className?: ClassValue;
};

const Loader = ({ className }: LoaderProps) => {
    return (
        <svg
            className={cxTw('flex h-6 w-6 animate-spin', className)}
            viewBox="0 0 100 100"
        >
            <circle
                fill="none"
                strokeWidth="10"
                className="opacity-0"
                cx="50"
                cy="50"
                r="40"
            />
            <circle
                fill="none"
                strokeWidth="10"
                className="stroke-neutral-950"
                strokeDasharray="180"
                strokeDashoffset="0"
                cx="50"
                cy="50"
                r="40"
            />
        </svg>
    );
};

export default Loader;
