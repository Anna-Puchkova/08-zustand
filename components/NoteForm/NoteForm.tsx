"use client";

import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleSubmit = async (formData: FormData) => {
    const payload = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as any,
    };

    await createNote(payload);

    clearDraft();
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label>Title</label>
        <input
          name="title"
          defaultValue={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label>Content</label>
        <textarea
          name="content"
          defaultValue={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label>Tag</label>
        <select
          name="tag"
          defaultValue={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as any })}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.cancelButton}
        >
          Cancel
        </button>

        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
