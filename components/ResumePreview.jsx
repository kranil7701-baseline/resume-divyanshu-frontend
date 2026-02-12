import React from "react";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";

export default function ResumePreview({ data, template = 'template1', font, color, id }) {
    switch (template) {
        case 'template2':
            return <Template2 data={data} font={font} color={color} id={id} />;
        case 'template3':
            return <Template3 data={data} font={font} color={color} id={id} />;
        case 'template4':
            return <Template4 data={data} font={font} color={color} id={id} />;
        case 'template1':
        default:
            return <Template1 data={data} font={font} color={color} id={id} />;
    }
}
