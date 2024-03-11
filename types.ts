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

type TextRecognitionProps = {
  setBelopp: (belopp: string) => void;
  setDatum: (datum: string) => void;
};

type InkomstUtgiftProps = {
  radioInkomstUtgift: string;
  setRadioInkomstUtgift: (value: string) => void;
};

type AccountSearchProps = {
  radioInkomstUtgift: string;
  searchText: string;
  setSearchText: (value: string) => void;
  setMotkonto: (value: string) => void;
};

type FetchDataItem = {
  konto: string;
  beskrivning: string;
};

type AccountsProps = {
  företagsKonto: string;
  setFöretagsKonto: (value: string) => void;
  motkonto: string | undefined;
  setMotkonto: (value: string) => void;
  momsKonto: string | undefined;
  setMomsKonto: (value: string) => void;
  radioInkomstUtgift: string;
};

type InformationProps = {
  belopp: string | undefined;
  setBelopp: (belopp: string) => void;
  land: string;
  setLand: (land: string) => void;
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
  konto1: number;
  konto2: number;
  konto3: number;
  belopp: number;
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
