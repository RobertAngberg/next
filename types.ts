// ---- HOME ----

type FrontCardProps = {
  title: string;
  data: number;
};

type RowData = {
  id: number;
  verifikationsdatum: string;
  belopp: number;
};

type HomeChartProps = {
  year: string;
  setYear: (year: string) => void;
  chartData: RowData[] | undefined;
};

// ---- BOOKKEEP ----

type Step2Props = {
  setCurrentStep: (number: number) => void;
}

type FileUploadProps = {
  setFile: (file: File | null) => void;
  setPdfUrl: (url: string | null) => void;
  setBelopp: (number: number) => void;
  setDatum: (datum: string) => void;
  file: File | null;
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
  // radioInkomstUtgift: string;
  searchText: string;
  setCurrentStep: (value: number) => void;
  setSearchText: (value: string) => void;
  setKontonummer: (value: number) => void;
  setKontotyp: (value: string) => void;
  setKontonamn: (value: string) => void;
};

type FetchDataItem = {
  konto_nummer: number;
  konto_typ: string;
  konto_namn: string;
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
  belopp: number | undefined;
  setBelopp: (belopp: number) => void;
  land: string;
  setLand: (land: string) => void;
  datum: string;
  setDatum: (datum: string) => void;
};

type TitleAndCommentProps = {
  kommentar: string;
  setKommentar: (value: string) => void;
};

// ---- HISTORY ----

type HistoryItem = {
  id: string;
  verifikationsdatum: string;
  fil: string;
  företagskonto: number;
  motkonto: number;
  momskonto: number;
  belopp: number;
  land: string;
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
