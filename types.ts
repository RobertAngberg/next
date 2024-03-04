// ---- HOME ----

type FrontCardProps = {
  title: string;
  data: number;
};

type RowData = {
  id: number;
  datum: string;
  belopp: string;
};

type HomeChartProps = {
  year: string;
  setYear: (year: string) => void;
  chartData: RowData[] | undefined;
};

// ---- BOOKKEEP ----

type FileUploadProps = {
  setFile: (file: File | null) => void;
  setPdfUrl: (url: string | null) => void;
  setBelopp: (belopp: string) => void;
  setDatum: (datum: string) => void;
  file: File | null;
};

///////////////////////////////// Ta bort ////////////////
type TextRecognitionProps = {
  setBelopp: (belopp: string) => void;
  setDatum: (datum: string) => void;
};

type InkomstUtgiftProps = {
  radioInkomstUtgift: string;
  setRadioInkomstUtgift: (value: string) => void;
};

type AccountSearchProps = {
  radio: string;
  searchText: string;
  setSearchText: (value: string) => void;
};

type AccountsProps = {
  konto1: string;
  setKonto1: (value: string) => void;
  konto2: string;
  setKonto2: (value: string) => void;
  konto3: string;
  setKonto3: (value: string) => void;
};

type InformationProps = {
  belopp: string;
  setBelopp: (belopp: string) => void;
  säljarensLand: string;
  setSäljarensLand: (land: string) => void;
  datum: string;
  setDatum: (datum: string) => void;
};

type TitleAndCommentProps = {
  titel: string;
  setTitel: (value: string) => void;
  kommentar: string;
  setKommentar: (value: string) => void;
};

// ---- HISTORY ----

type HistoryItem = {
  id: string;
  datum: string;
  fil: string;
  konto1: string;
  konto2: string;
  konto3: string;
  belopp: string;
  land: string;
  inkomst_utgift: string;
  titel: string;
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
