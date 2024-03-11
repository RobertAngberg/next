"use client";

const TitleAndComment: React.FC<TitleAndCommentProps> = ({
  kommentar,
  setKommentar,
}) => {
  return (
    <div className="padder">
      <label htmlFor="kommentar">Kommentar:</label>
      <textarea
        className="w-full p-2 mb-4 text-black border-2 border-gray-600 border-solid rounded"
        id="kommentar"
        name="kommentar"
        maxLength={250}
        placeholder="Valfritt"
        value={kommentar}
        onChange={(e) => setKommentar(e.target.value)}
      />
    </div>
  );
};

export default TitleAndComment;
