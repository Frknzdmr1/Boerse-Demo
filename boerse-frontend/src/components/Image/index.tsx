import { useState, FC } from "react";
import { Img as ReactImage } from "react-image";

interface ImageProps {
    className?: string;
    src: string;
    alt: string;
    [key: string]: any; // Allow any additional props
}

const Image: FC<ImageProps> = ({ className, src, alt, ...props }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <ReactImage
            className={`inline-block align-top opacity-0 transition-opacity ${
                loaded && "opacity-100"
            } ${className || ""}`}
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            {...props}
        />
    );
};

export default Image;
