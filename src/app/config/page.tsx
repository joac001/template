'use client';

import Container from "@/components/shared/ui/content/Container";
import Typography from "@/components/shared/ui/text/Typography";

export default function Page() {
    return (
        <Container className="mt-10 flex flex-col h-screen space-y-8 items-center">
            <Typography variant="h1">Ohh.... No se suponia que tenias que encontrarme ya.</Typography>
            <Typography variant="h2">O si?...</Typography>
        </Container >
    );
}