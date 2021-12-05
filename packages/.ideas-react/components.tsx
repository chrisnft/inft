import React, { useCallback } from 'react'
import hljs from 'highlight.js/lib/core'
import hlJson from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/base16/snazzy.css'
hljs.registerLanguage('json', hlJson)
const FJSON = (v: any) => JSON.stringify(v, null, 2)
const hlObj = (data: any) =>
  hljs.highlight(FJSON(data), { language: 'json' }).value

export const Code = ({ data }: { data: any }) => {
  console.log('Code mounted.')
  return (
    <pre className="container overflow-auto bg-gray-700 rounded-lg md max-h-72">
      <code className="language-json">
        <div dangerouslySetInnerHTML={{ __html: hlObj(data) }}></div>
      </code>
    </pre>
  )
}

export const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md center mx-auto container max-w-lg p-2">
      <div>
        <h1 className="font-mono font-bold mb-2">iNFT</h1>
      </div>
      <div>{children}</div>
    </div>
  )
}

export const Section = ({
  data,
  title,
  loading,
}: {
  data?: any
  title: string
  loading?: boolean
}) => {
  return (
    <>
      {data && (
        <div className="main rounded-lg border p-2">
          <h1
            className={'mb-2 flex content-center justify-start p-1 font-mono'}
          >
            <span>{title}</span>
          </h1>
          <Code data={data ? data : {}} />
        </div>
      )}
    </>
  )
}

export interface IForm {
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  handleDrop: React.ChangeEventHandler<HTMLInputElement>
  //   handleDrop: (files: any) => void;
  vals: {
    name: string
    description: string
    file?: File | Blob | string
    loading: boolean
    prevImgURL?: string
    error: unknown
  }
}

export const MintForm = ({
  handleSubmit,
  handleDrop,
  handleChange,
  vals,
}: IForm) => {
  return (
    <div className="main bg-gray-100 p-2 rounded-md">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 divide-y divide-gray-200 border-gray-500"
      >
        <Input
          type="text"
          name="name"
          value={vals.name}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="description"
          value={vals.description}
          onChange={handleChange}
        />
        <FileInput
          prevImgURL={vals.prevImgURL}
          type="file"
          name="file"
          onChange={handleDrop}
        />
        <Button type="submit" />
      </form>
    </div>
  )
}

export interface INFTMeta {
  name: string
  description: string
  image: string
  tokenURI: string
}

export const Spinner = ({ loading }: { loading?: boolean }) => {
  return (
    <>
      {loading && (
        <div
          style={_spinnerStyle}
          className="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"
        />
      )}
    </>
  )
}

const _spinnerStyle: React.CSSProperties = {
  borderTopColor: 'transparent',
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const Input = ({
  name,
  label = name,
  ...props
}: {
  name: string
  label?: string
  onChange: any
  type: string
  value?: any
}) => (
  <div className="sm:col-span-3">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {capitalize(label)}
    </label>
    <div className="mt-1">
      <input
        id={name}
        name={name}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        {...props}
      />
    </div>
  </div>
)

const PreviewImg = ({
  src = '',
  alt = '',
  width = 100,
  height = 100,
  className = '',
  refnode = null,
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={'h-30 ' + src == null ? 'invisible' : 'visible'}
      ref={refnode}
      {...props}
    />
  )
}

const Button = ({
  type,
  isLoading,
}: {
  type: 'button' | 'reset' | 'submit' | undefined
  isLoading?: boolean
}) => {
  return (
    <button
      type={type}
      className="border-solid border bg-gray-200 flex items-center gap-2 h-15 bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border-blue-500 hover:border-transparent rounded"
    >
      <>
        {isLoading && <Spinner />}
        <span>Submit</span>
      </>
    </button>
  )
}

const FileInput = ({
  name,
  label = name,
  prevImgURL,
  ...props
}: {
  name: string
  label?: string
  onChange: any
  type: string
  prevImgURL?: string
}) => {
  return (
    <div className="sm:col-span-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        Image
      </label>

      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={name}
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>{capitalize(label)}</span>
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <Input
            name={name}
            // @ts-ignore
            className="sr-only"
            {...props}
          />
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          {prevImgURL && <PreviewImg src={prevImgURL} />}
        </div>
      </div>
    </div>
  )
}
