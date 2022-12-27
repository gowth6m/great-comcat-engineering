import React, { useState } from "react";

export function IconMenu(
  { fill, open, width, height, className }: any,
  props: any
) {
  if (open) {
    return (
      <svg
        width={width ?? "26"}
        height={height ?? "24"}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
          fill={fill ?? "#0D0D0D"}
        />
      </svg>
    );
  }

  return (
    <svg
      width={width ?? "26"}
      height={height ?? "22"}
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1ZM0 6C0 5.44772 0.447715 5 1 5H15C15.5523 5 16 5.44772 16 6C16 6.55228 15.5523 7 15 7H1C0.447715 7 0 6.55228 0 6ZM0 11C0 10.4477 0.447715 10 1 10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H1C0.447715 12 0 11.5523 0 11Z"
        fill={fill ?? "#0D0D0D"}
      />
    </svg>
  );
}

export function IconCart({ fill, width, height }: any, props: any) {
  return (
    <svg
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.class}
    >
      <path
        d="M2.1421 2.00002L4.00913 14.1357C4.02271 14.2359 4.05113 14.3313 4.0921 14.4198C4.21543 14.6861 4.45246 14.889 4.74088 14.9661C4.82899 14.9898 4.92133 15.0016 5.01578 15H16C16.4416 15 16.8309 14.7103 16.9578 14.2874L19.9578 4.28736C20.0487 3.98459 19.991 3.65669 19.8023 3.40308C19.6136 3.14948 19.3161 3.00002 19 3.00002H4.31948L3.99058 0.862207C3.97826 0.772825 3.95413 0.687212 3.91981 0.606996C3.85751 0.46092 3.76213 0.334387 3.64429 0.235207C3.53497 0.143016 3.40561 0.0738391 3.26367 0.0351428C3.17434 0.0106786 3.0806 -0.00157508 2.9847 1.52593e-05H1C0.447715 1.52593e-05 0 0.44773 0 1.00002C0 1.5523 0.447715 2.00002 1 2.00002H2.1421ZM5.85794 13L4.62717 5.00002H17.656L15.256 13H5.85794Z"
        fill={fill ?? "#0D0D0D"}
      />
      <path
        d="M8 18C8 19.1046 7.10457 20 6 20C4.89543 20 4 19.1046 4 18C4 16.8954 4.89543 16 6 16C7.10457 16 8 16.8954 8 18Z"
        fill={fill ?? "#0D0D0D"}
      />
      <path
        d="M17 18C17 19.1046 16.1046 20 15 20C13.8954 20 13 19.1046 13 18C13 16.8954 13.8954 16 15 16C16.1046 16 17 16.8954 17 18Z"
        fill={fill ?? "#0D0D0D"}
      />
    </svg>
  );
}

export function IconSearch({ fill, width, height }: any, props: any) {
  return (
    <svg
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.class}
    >
      <path
        d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.84871 15.3729 11.551 14.3199 12.9056L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12.9056 14.3199C11.551 15.3729 9.84871 16 8 16C3.58172 16 0 12.4183 0 8Z"
        fill={fill ?? "#0D0D0D"}
      />
    </svg>
  );
}

export function IconUser({ fill, width, height }: any, props: any) {
  return (
    <svg
      width={width ?? "22"}
      height={height ?? "24"}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 2C6.79086 2 5 3.79086 5 6C5 8.20914 6.79086 10 9 10C11.2091 10 13 8.20914 13 6C13 3.79086 11.2091 2 9 2ZM3 6C3 2.68629 5.68629 0 9 0C12.3137 0 15 2.68629 15 6C15 9.31371 12.3137 12 9 12C5.68629 12 3 9.31371 3 6ZM5 16C3.34315 16 2 17.3431 2 19C2 19.5523 1.55228 20 1 20C0.447715 20 0 19.5523 0 19C0 16.2386 2.23858 14 5 14H13C15.7614 14 18 16.2386 18 19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19C16 17.3431 14.6569 16 13 16H5Z"
        fill={fill ?? "#0D0D0D"}
      />
    </svg>
  );
}

export function IconAddCart(
  { fill, width, height, className }: any,
  props: any
) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width={width ?? "24"}
      height={height ?? "24"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M6.00913 16.1357L4.1421 4.00002H3C2.44772 4.00002 2 3.5523 2 3.00002C2 2.44773 2.44772 2.00002 3 2.00002H4.9847C5.0806 1.99842 5.17434 2.01068 5.26367 2.03514C5.40561 2.07384 5.53497 2.14302 5.64429 2.23521C5.76213 2.33439 5.85751 2.46092 5.91981 2.607C5.95413 2.68721 5.97826 2.77282 5.99058 2.86221L6.31948 5.00002H14V7.00002H6.62717L7.85794 15H17.256L18.756 10H20.844L18.9578 16.2874C18.8309 16.7103 18.4416 17 18 17H7.01578C6.92133 17.0016 6.82899 16.9898 6.74088 16.9661C6.59074 16.926 6.45453 16.8517 6.34104 16.7522C6.2371 16.6612 6.15157 16.5486 6.0921 16.4198C6.05113 16.3313 6.02271 16.2359 6.00913 16.1357Z"
        fill={fill ?? "#0D0D0D"}
      ></path>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M10 20C10 21.1046 9.10457 22 8 22C6.89543 22 6 21.1046 6 20C6 18.8954 6.89543 18 8 18C9.10457 18 10 18.8954 10 20Z"
        fill={fill ?? "#0D0D0D"}
      ></path>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
        fill={fill ?? "#0D0D0D"}
      ></path>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M19 2.00002C19.5523 2.00002 20 2.44773 20 3.00002V4.00002H21C21.5523 4.00002 22 4.44773 22 5.00002C22 5.5523 21.5523 6.00002 21 6.00002H20V7.00002C20 7.5523 19.5523 8.00002 19 8.00002C18.4477 8.00002 18 7.5523 18 7.00002V6.00002H17C16.4477 6.00002 16 5.5523 16 5.00002C16 4.44773 16.4477 4.00002 17 4.00002H18V3.00002C18 2.44773 18.4477 2.00002 19 2.00002Z"
        fill={fill ?? "#0D0D0D"}
      ></path>
    </svg>
  );
}

export function IconHeart({ fill, width, height, className }: any, props: any) {
  return (
    <svg
      width={width ?? "20"}
      height={height ?? "18"}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 1.52765C7.64418 -0.583106 4.02125 -0.506535 1.75736 1.75736C-0.585786 4.1005 -0.585786 7.8995 1.75736 10.2426L8.58579 17.0711C9.36684 17.8521 10.6332 17.8521 11.4142 17.0711L18.2426 10.2426C20.5858 7.8995 20.5858 4.1005 18.2426 1.75736C15.9787 -0.506535 12.3558 -0.583106 10 1.52765ZM8.82843 3.17157L9.29289 3.63604C9.68342 4.02656 10.3166 4.02656 10.7071 3.63604L11.1716 3.17157C12.7337 1.60948 15.2663 1.60948 16.8284 3.17157C18.3905 4.73367 18.3905 7.26633 16.8284 8.82843L10 15.6569L3.17157 8.82843C1.60948 7.26633 1.60948 4.73367 3.17157 3.17157C4.73367 1.60948 7.26633 1.60948 8.82843 3.17157Z"
        fill={fill ?? "#0D0D0D"}
      />
    </svg>
  );
}

export function IconLoadingAnimation({ fill, width, height, className }: any, props: any) {
  return (
    <svg
      role="status"
      className="inline mr-3 w-5 h-5 mb-1 text-white animate-spin"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#414141"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
}
