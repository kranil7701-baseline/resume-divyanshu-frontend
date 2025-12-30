import React from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";

export default function ResumePreview({ data, template = 'modern' }) {
    if (template === 'classic') {
        return <ClassicTemplate data={data} />;
    }

    // Default to modern
    return <ModernTemplate data={data} />;
}
