import React from "react";
import hljs from "highlight.js/lib/core";
import hlJson from "highlight.js/lib/languages/json";
import "highlight.js/styles/base16/snazzy.css";
hljs.registerLanguage("json", hlJson);
const FJSON = (v: any) =>
  JSON.stringify(v, null, 2);
const hlObj = (data: any) =>
  hljs.highlight(FJSON(data), {
    language: "json",
  }).value;

export const Main = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="md center mx-auto container max-w-lg p-2">
      <div className="flex justify-between font-mono font-bold mb-2">
        <h1 className="font-mono font-bold">
          iNFT
        </h1>
        <a href="/docs">🤖 API</a>
      </div>
      <div>{children}</div>
    </div>
  );
};

const SaveSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    />
  </svg>
);

export const Section = ({
  data,
  title,
  handleDownloadOnClick,
}: {
  data?: any;
  title: string;
  handleDownloadOnClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
      {data && (
        <div className="main rounded-lg shadow p-2">
          <div
            className={
              "mb-2 flex content-center p-1 font-mono justify-between align-items-baseline"
            }
          >
            <span>{title}</span>
            <button
              onClick={handleDownloadOnClick}
              className="text-gray-300"
            >
              {SaveSVG}
            </button>
          </div>
          <Code data={data ? data : {}} />
        </div>
      )}
    </>
  );
};

export const Code = ({ data }: { data: any }) => {
  console.log("Code mounted.");
  return (
    <pre className="container overflow-auto bg-gray-700 rounded-lg md h-72">
      <code className="language-json">
        <div
          dangerouslySetInnerHTML={{
            __html: hlObj(data),
          }}
        ></div>
      </code>
    </pre>
  );
};
