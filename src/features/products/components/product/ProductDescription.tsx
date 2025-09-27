import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { Json } from "@/common/supabase/types";

interface Props {
  content: JSONContent | Json;
}
export function ProductDescription({ content }: Props) {

  const editor = useEditor({
    extensions: [StarterKit],
    content: content as JSONContent,
    editable: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none"
      }
    }
  })

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-center mb-8 underline">
        Descripción
      </h2>
      <EditorContent editor={editor} />
    </div>
  );
}
