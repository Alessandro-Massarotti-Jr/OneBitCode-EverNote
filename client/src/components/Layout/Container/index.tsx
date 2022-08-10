import Header from "../Header";

interface ContainerProps {
    children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}