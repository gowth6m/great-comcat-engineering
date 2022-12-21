import React from "react";
import Link from "next/link";

export default function DropdownLink(props: any) {
  let { href, children, ...rest } = props;

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
