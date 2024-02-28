"use client";

const TitleAndComment: React.FC<TitleAndCommentProps> = ({
  titel,
  setTitel,
  kommentar,
  setKommentar,
}) => {
  return (
    <div className="padder">
      <label htmlFor="titel">Titel:</label>
      <input
        className="w-full mb-4 p-2 border-solid border-2 border-gray-600 rounded text-black"
        type="text"
        id="titel"
        name="titel"
        maxLength={50}
        placeholder="Valfritt"
        value={titel}
        onChange={(e) => setTitel(e.target.value)}
      />

      <label htmlFor="kommentar">Kommentar:</label>

      <textarea
        className="w-full mb-4 p-2 border-solid border-2 border-gray-600 rounded text-black"
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
