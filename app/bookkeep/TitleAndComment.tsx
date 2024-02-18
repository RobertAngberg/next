"use client";

type TitleAndCommentProps = {
  titel: string;
  setTitel: (value: string) => void;
  kommentar: string;
  setKommentar: (value: string) => void;
};

const TitleAndComment: React.FC<TitleAndCommentProps> = ({
  titel,
  setTitel,
  kommentar,
  setKommentar,
}) => {
  return (
    <div className="padder">
      <label htmlFor="titel">Titel:</label>
      <br />
      <input
        className="w-full p-2 border-solid border-2 border-gray-600 rounded"
        type="text"
        id="titel"
        name="titel"
        maxLength={50}
        placeholder="Valfritt"
        value={titel}
        onChange={(e) => setTitel(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="kommentar">Kommentar:</label>
      <br />
      <textarea
        className="w-full p-2 border-solid border-2 border-gray-600 rounded"
        id="kommentar"
        name="kommentar"
        maxLength={250}
        placeholder="Valfritt"
        value={kommentar}
        onChange={(e) => setKommentar(e.target.value)}
      />
      <br />
      <br />
    </div>
  );
};

export default TitleAndComment;
