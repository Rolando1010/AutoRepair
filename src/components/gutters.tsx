const GutterContainer = ({ children }: { children: React.ReactNode }) => <>
    <div>{children}</div>
    <style jsx>{`
        div {
            display: flex;
            flex-wrap: wrap;
        }
    `}</style>
</>;

const Gutter = ({ percentage, children }: {
    percentage: number,
    children: React.ReactNode
}) => <>
    <div>{children}</div>
    <style jsx>{`
        div {
            width: ${percentage}%;
        }
        @media (max-width: 800px){
            div {
                width: 100%;
            }
        }
    `}</style>
</>;

export {
    GutterContainer,
    Gutter
}