import React, { type ReactNode } from "react";
import clsx from "clsx";
import type { Props } from "@theme/Icon/Edit";

import styles from "./styles.module.css";

export default function IconEdit({
  className,
  ...restProps
}: Props): ReactNode {
  return (
    <svg
      fill="currentColor"
      height="20"
      width="20"
      viewBox="0 0 40 40"
      className={clsx(styles.iconEdit, className)}
      aria-hidden="true"
      {...restProps}
    >
      <g>
        {/* <path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z" /> */}
        <path d="M29.997,9.807L34.615,14.161L10.554,38.222C10.336,38.44 10.073,38.604 9.783,38.704L1.583,38.846C1.317,38.938 1.062,38.683 1.154,38.417L1.295,30.218C1.396,29.927 1.561,29.664 1.778,29.446L29.625,1.599C32.188,-0.964 40.966,7.811 38.401,10.374L36.778,11.998L32.329,8.627C31.566,8.257 30.021,9.761 29.997,9.807Z" />
      </g>
    </svg>
  );
}
