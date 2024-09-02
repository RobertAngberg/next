////////////////////////////////////////
// FRAMSIDA
////////////////////////////////////////

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
  setYear: React.Dispatch<React.SetStateAction<string>>;
  chartData?: Array<{
    transaktionsdatum: string;
    belopp: number;
    kontotyp: string;
  }>;
};

////////////////////////////////////////
// BOKFÖR
////////////////////////////////////////

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
  setCurrentStep: (currentStep: number) => void;
};

type FileUploadProps = {
  setFil: (fil: File | null) => void;
  setPdfUrl: (url: string | null) => void;
  setBelopp: (number: number) => void;
  setTransaktionsdatum: (datum: string) => void;
  fil: File | null;
};

type SearchResultsProps = {
  data: FetchDataItem;
  onClick: (item: FetchDataItem) => void;
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
  sökord: string;
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

////////////////////////////////////////
// GRUNDBOK
////////////////////////////////////////

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

type TransactionDetail = {
  transaktionspost_id: number;
  transaktions_id: number;
  konto_id: number;
  debet: number;
  kredit: number;
  kontobeskrivning: string;
};

type TableProps = {
  historyData: HistoryItem[];
  handleRowClick: (id: number) => void;
  activeId: number | null;
  details: TransactionDetail[];
};

type YearSelectProps = {
  setYear: (year: string) => void;
};

type TableRowProps = {
  item: HistoryItem;
  handleRowClick: (id: number) => void;
  activeId: number | null;
  details: TransactionDetail[];
};

////////////////////////////////////////
// HUVUDBOK
////////////////////////////////////////

type HuvudbokProps = {
  toggleGroup: Group;
  buttonText: string;
  fieldGroupVisible: boolean;
};

type TransactionItem = {
  transaktionsdatum: string;
  fil: string;
  kontobeskrivning: string;
  debet: number;
  kredit: number;
  transaktions_id: string;
  kontonummer: number;
};

type HuvudbokItem = {
  kontonummer: string;
  kontobeskrivning: string;
  transaktionsdatum: string;
  fil: string;
  debet: number;
  kredit: number;
};

type GroupedTransactions = Record<string, TransactionItem[]>;

////////////////////////////////////////
// FAKTURA
////////////////////////////////////////

type Group = "first4" | "second4" | "third4" | "fourth4" | "fifth4" | "sixth4" | "seventh4";

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

////////////////////////////////////////
// SITEBUILDER
////////////////////////////////////////

type AddSectionsMenuProps = {
  handleButtonClick: (type: "header" | "text" | "image" | "twoColumns" | "threeColumns" | "headerImage") => void;
}

type SectionProps = {
  sections: number[];
  setSections: React.Dispatch<React.SetStateAction<number[]>>;
  sectionId: number;
};

type AddButtonProps = {
  onClick: () => void;
}

type Content = {
  kind: "header" | "text" | "image" | "twoColumns" | "threeColumns" | "headerImage";
  text?: string;
  imageUrl?: string;
};

type DisplayContentProps = {
  content: Content | null;
  sections: number[];
  setSections: React.Dispatch<React.SetStateAction<number[]>>;
  handleAddContent: HandleAddContent;
  isAddingContentType: Content["kind"] | null;
}


type ContentHeaderProps = {
  handleAddContent: (type: "header", text: string) => void;
};

type ContentTextProps = {
  handleAddContent: (type: "text", text: string) => void;
}

type HandleAddContent = (kind: "header" | "text" | "image" | "twoColumns" | "threeColumns", 
  text?: string, imageUrl?: string) => void;

type ContentTwoColumnsProps = {
  sections: number[];
  setSections: React.Dispatch<React.SetStateAction<number[]>>;
  sectionId: number;
}

type HeaderImageProps = {
  sections: number[];
  setSections: React.Dispatch<React.SetStateAction<number[]>>;
  sectionId: number;
}