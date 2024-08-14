import { ReactNode } from 'react';

const PageContainer = ({ children }: { children: ReactNode }) => {
    return <main className="flex flex-col">{children}</main>;
};

export default PageContainer;
