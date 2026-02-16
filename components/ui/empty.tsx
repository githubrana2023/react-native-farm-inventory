import { cn } from "@/lib/utils"; // your utility for className merge
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Text, TextProps, View, ViewProps } from "react-native";

// ---------- Empty Container ----------
function Empty({ className, ...props }: ViewProps) {
    return (
        <View
            className={cn(
                "gap-4 rounded-xl border-dashed p-6 flex-1 items-center justify-center text-center",
                className
            )}
            {...props}
        />
    )
}

// ---------- Empty Header ----------
function EmptyHeader({ className, ...props }: ViewProps) {
    return (
        <View
            className={cn("gap-2 flex max-w-sm flex-col items-center", className)}
            {...props}
        />
    )
}

// ---------- Empty Media ----------
const emptyMediaVariants = cva(
    "mb-2 flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-transparent",
                icon: "bg-muted text-foreground w-8 h-8 rounded-lg items-center justify-center",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

function EmptyMedia({
    className,
    variant = "default",
    ...props
}: ViewProps & VariantProps<typeof emptyMediaVariants>) {
    return (
        <View
            className={cn(emptyMediaVariants({ variant, className }))}
            {...props}
        />
    )
}

// ---------- Empty Title ----------
function EmptyTitle({ className, ...props }: TextProps) {
    return (
        <Text
            className={cn("text-lg font-medium tracking-tight text-center", className)}
            {...props}
        />
    )
}

// ---------- Empty Description ----------
function EmptyDescription({ className, ...props }: TextProps) {
    return (
        <Text
            className={cn(
                "text-sm text-muted-foreground text-center",
                className
            )}
            {...props}
        />
    )
}

// ---------- Empty Content ----------
function EmptyContent({ className, ...props }: ViewProps) {
    return (
        <View
            className={cn(
                "gap-2.5 flex w-full max-w-sm flex-col items-center",
                className
            )}
            {...props}
        />
    )
}

export {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
};

