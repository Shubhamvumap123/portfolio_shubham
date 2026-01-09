"use client";

import React, { useState } from 'react';
import { Button, Flex, Toast } from "@/once-ui/components";

interface CopyEmailButtonProps {
    email: string;
    label?: string;
}

export const CopyEmailButton = ({ email, label = "Copy Email" }: CopyEmailButtonProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Flex position="relative">
            <Button
                onClick={handleCopy}
                variant="secondary"
                size="s"
                prefixIcon={copied ? "check" : "email"}
                label={copied ? "Copied!" : label}
            />
        </Flex>
    );
};
