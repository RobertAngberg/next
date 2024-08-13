"use client";

function Comment({ kommentar, setKommentar }: CommentProps) {
  return (
    <div className="mb-4">
      <label htmlFor="kommentar">Kommentar:</label>
      <textarea
        className="w-full p-2 mb-4 text-black border-2 border-gray-600 border-solid rounded"
        id="kommentar"
        name="kommentar"
        maxLength={500}
        placeholder="Valfritt"
        value={kommentar}
        onChange={(e) => setKommentar(e.target.value)}
      />
    </div>
  );
}

export { Comment };
