// ---- HOME ----

type FrontCardProps = {
  title: string;
  data: number;
};

type RowData = {
  id: number;
  transaktionsdatum: string;
  belopp: number;
};

type HomeChartProps = {
  year: string;
  setYear: (year: string) => void;
  chartData: RowData[] | undefined;
};

// ---- BOOKKEEP ----

type Step2Props = {
  setCurrentStep: (stepNumber: number) => void;
  fil: File | null;
  setFil: (fil: File | null) => void;
  pdfUrl: string | null;
  setPdfUrl: (url: string | null) => void;
  belopp: number | undefined;
  setBelopp: (amount: number | undefined) => void;
  transaktionsdatum: string;
  setTransaktionsdatum: (date: string) => void;
  kommentar: string;
  setKommentar: (comment: string) => void;
};

type Step3Props = {
  kontonummer: number;
  kontobeskrivning: string | undefined;
  kontotyp: string | undefined;
  fil: File | null;
  belopp: number | undefined;
  transaktionsdatum: string;
  kommentar: string;
};

type FileUploadProps = {
  setFil: (fil: File | null) => void;
  setPdfUrl: (url: string | null) => void;
  setBelopp: (number: number) => void;
  setTransaktionsdatum: (datum: string) => void;
  fil: File | null;
};

type TextRecognitionProps = {
  setBelopp: (belopp: number) => void;
  setDatum: (datum: string) => void;
};

type InkomstUtgiftProps = {
  radioInkomstUtgift: string;
  setRadioInkomstUtgift: (value: string) => void;
};

type AccountSearchProps = {
  searchText: string;
  setSearchText: (value: string) => void;
  setKontonummer: (value: number) => void;
  setKontotyp: (value: string) => void;
  setKontobeskrivning: (value: string) => void;
  setCurrentStep: (value: number) => void;
};

type FetchDataItem = {
  kontonummer: number;
  kontotyp: string;
  kontobeskrivning: string;
};

type AccountsProps = {
  företagsKonto: string;
  setFöretagsKonto: (value: string) => void;
  motkonto: number | undefined;
  setMotkonto: (value: number) => void;
  momsKonto: string | undefined;
  setMomsKonto: (value: string) => void;
  radioInkomstUtgift: string;
};

type InformationProps = {
  belopp: number | undefined;
  setBelopp: (belopp: number) => void;
  transaktionsdatum: string;
  setTransaktionsdatum: (datum: string) => void;
};

type CommentProps = {
  kommentar: string;
  setKommentar: (value: string) => void;
};

// ---- HISTORY ----

type HistoryItem = {
  transaktions_id: number;
  transaktionsdatum: string;
  fil: string;
  företagskonto: number;
  kontobeskrivning: number;
  momskonto: number;
  belopp: number;
  inkomst_utgift: string;
  kommentar: string;
};

// ---- INVOICE ----

type Group =
  | "first4"
  | "second4"
  | "third4"
  | "fourth4"
  | "fifth4"
  | "sixth4"
  | "seventh4";

type TextFields = { [key: string]: string };
type LogoImage = HTMLImageElement | null;

type InvoiceCanvasProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  textFields: TextFields;
  logoImage: LogoImage;
  saveAsJPG: () => void;
};

type ToggleButtonProps = {
  toggleGroup: Group;
  buttonText: string;
  fieldGroupVisible: boolean;
  onToggle: (group: Group) => void;
};

type InputComponentProps = {
  labelText: string;
  textFields: TextFields;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type LogoUploadProps = {
  handleFileUpload: (logoImage: HTMLImageElement) => void;
};
