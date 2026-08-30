'use client'

import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  toolbarPlugin,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertCodeBlock,
  InsertThematicBreak,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  codeBlockPlugin,
  imagePlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from '@mdxeditor/editor'

import { basicDark } from 'cm6-theme-basic-dark'
import { useTheme } from 'next-themes'

import '@mdxeditor/editor/style.css'
import './dark-editor.css'

interface Props extends MDXEditorProps {
  value: string
  fieldChange: (value: string) => void
  editorRef: ForwardedRef<MDXEditorMethods> | null
}

export default function Editor({
  value,
  fieldChange,
  editorRef,
  ...props
}: Props) {
  const { resolvedTheme } = useTheme()

  const themeExtension = resolvedTheme === 'dark' ? [basicDark] : []

  return (
    <MDXEditor
      key={resolvedTheme}
      ref={editorRef}
      markdown={value}
      onChange={fieldChange}
      className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkDialogPlugin(),
        linkPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        tablePlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            css: 'css',
            txt: 'txt',
            sql: 'sql',
            html: 'html',
            saas: 'saas',
            scss: 'scss',
            bash: 'bash',
            json: 'json',
            js: 'javascript',
            ts: 'typescript',
            '': 'unspecified',
            tsx: 'TypeScript (React)',
            jsx: 'JavaScript (React)',
          },
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: themeExtension,
        }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: '' }),
        markdownShortcutPlugin(),

        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === 'codeblock',
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />

                      <BoldItalicUnderlineToggles />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />

                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
      {...props}
    />
  )
}
