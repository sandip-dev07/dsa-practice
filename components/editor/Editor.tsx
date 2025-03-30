import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import typescript from "highlight.js/lib/languages/typescript";
import sql from "highlight.js/lib/languages/sql";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import { useEffect, useCallback, useState } from "react";
import {
  Bold,
  Italic,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  X,
} from "lucide-react";

const lowlight = createLowlight();
lowlight.register("js", js);
lowlight.register("python", python);
lowlight.register("java", java);
lowlight.register("cpp", cpp);
lowlight.register("css", css);
lowlight.register("html", html);
lowlight.register("typescript", typescript);
lowlight.register("sql", sql);
lowlight.register("bash", bash);
lowlight.register("json", json);

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

// Function to detect if text looks like code
const looksLikeCode = (text: string): boolean => {
  // Check for common code indicators
  const codeIndicators = [
    /^(function|class|const|let|var|import|export|if|for|while)\s/m, // Keywords
    /[{}\[\]()];/,  // Brackets and semicolons
    /\s{2,}|\t/,    // Indentation
    /=>/,           // Arrow functions
    /console\./,    // Console statements
    /return\s/,     // Return statements
    /\/\//,         // Comments
    /[A-Za-z]+\([^)]*\)/  // Function calls
  ];

  return codeIndicators.some(indicator => indicator.test(text));
};

const ImageDialog = ({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (url: string) => void }) => {
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Insert Image</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (url.trim()) {
                  onSubmit(url.trim());
                  setUrl("");
                  onClose();
                }
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Editor({ content, onChange, placeholder }: EditorProps) {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
          HTMLAttributes: {
            1: { class: 'text-3xl font-bold mt-6 mb-4' },
            2: { class: 'text-2xl font-semibold mt-5 mb-3' },
          },
        },
        code: {
          HTMLAttributes: {
            class: 'rounded-sm bg-muted px-1.5 py-0.5 font-mono text-sm',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'mb-3',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside ml-6 mb-3 space-y-1',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-outside ml-6 mb-3 space-y-1',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'pl-1',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-muted pl-4 italic my-4',
          },
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "cpp",
        HTMLAttributes: {
          class: "not-prose rounded-md bg-[#f3f4f6] dark:bg-[#1e1e1e] p-4 font-mono text-sm my-4 overflow-x-auto text-[#383838] dark:text-[#d4d4d4] [&_*]:!bg-transparent border border-[#e5e7eb] dark:border-[#2e2e2e]",
        },
        languageClassPrefix: 'hljs language-',
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full max-h-[500px] h-auto object-contain my-4",
        },
      }),
    ],
    content,
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 overflow-y-auto prose-pre:bg-transparent prose-pre:p-0 prose-code:before:content-none prose-code:after:content-none [&_.hljs]:!bg-transparent [&_pre.hljs]:!p-0 [&_pre]:!bg-transparent",
      },
      handlePaste: (view, event) => {
        const text = event.clipboardData?.getData('text/plain');
        if (text && looksLikeCode(text)) {
          event.preventDefault();
          const { state } = view;
          const { tr } = state;
          
          view.dispatch(tr.replaceSelectionWith(
            view.state.schema.nodes.codeBlock.create(
              { language: 'cpp' },
              [view.state.schema.text(text)]
            )
          ));
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const addImage = useCallback(() => {
    setIsImageDialogOpen(true);
  }, []);

  const handleImageSubmit = useCallback((url: string) => {
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const MenuButton = ({ onClick, isActive, children, title }: { onClick: () => void; isActive?: boolean; children: React.ReactNode; title: string }) => (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`p-2 rounded hover:bg-muted/80 transition-colors ${
        isActive ? "bg-muted text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
      title={title}
      type="button"
    >
      {children}
    </button>
  );

  const toggleHeading = (level: 1 | 2) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const toggleInlineCode = () => {
    if (!editor.state.selection.empty) {
      editor.chain().focus().toggleCode().run();
    } else {
      editor.chain().focus().toggleCodeBlock().run();
    }
  };

  return (
    <div className="border rounded-md bg-background flex flex-col h-full">
      <ImageDialog
        isOpen={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
        onSubmit={handleImageSubmit}
      />
      <div className="border-b p-2 flex flex-wrap gap-1 sticky top-0 bg-background z-10">
        <div className="flex items-center gap-1 border-r pr-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 border-r pr-1">
          <MenuButton
            onClick={() => toggleHeading(1)}
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => toggleHeading(2)}
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 border-r pr-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 border-r pr-1">
          <MenuButton
            onClick={addImage}
            isActive={false}
            title="Add Image"
          >
            <ImageIcon className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={toggleInlineCode}
            isActive={editor.isActive("code") || editor.isActive("codeBlock")}
            title="Code"
          >
            <Code className="h-4 w-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 border-r pr-1">
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            isActive={false}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            isActive={false}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </MenuButton>
        </div>
      </div>
      <div 
        className="flex-1 overflow-y-auto min-h-[300px] max-h-[500px] sm:max-h-[600px] md:max-h-[700px]"
        onClick={() => editor.chain().focus().run()}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
