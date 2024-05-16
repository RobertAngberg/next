interface Props {
  data: {
    period: string;
    forsMomsEjAnnan: number;
    inkopVaruAnnatEg: number;
    inkopTjanstAnnatEg: number;
    momsUlagImport: number;
    momsUtgHog: number;
    momsInkopUtgHog: number;
    momsImportUtgHog: number;
    momsIngAvdr: number;
    momsBetala: number;
  };
}

const DownloadXML: React.FC<Props> = ({ data }) => {
  const generateXml = (data: Props["data"]) => {
    return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE eSKDUpload PUBLIC "-//Skatteverket, Sweden//DTD Skatteverket eSKDUpload-DTD Version 6.0//SV" "https://www.skatteverket.se/download/18.3f4496fd14864cc5ac99cb1/1415022101213/eSKDUpload_6p0.dtd">
<eSKDUpload Version="6.0">
  <OrgNr>830618-6910</OrgNr>
  <Moms>
    <Period>${data.period}</Period>
    <ForsMomsEjAnnan>${data.forsMomsEjAnnan}</ForsMomsEjAnnan>
    <InkopVaruAnnatEg>${data.inkopVaruAnnatEg}</InkopVaruAnnatEg>
    <InkopTjanstAnnatEg>${data.inkopTjanstAnnatEg}</InkopTjanstAnnatEg>
    <MomsUlagImport>${data.momsUlagImport}</MomsUlagImport>
    <MomsUtgHog>${data.momsUtgHog}</MomsUtgHog>
    <MomsInkopUtgHog>${data.momsInkopUtgHog}</MomsInkopUtgHog>
    <MomsImportUtgHog>${data.momsImportUtgHog}</MomsImportUtgHog>
    <MomsIngAvdr>${data.momsIngAvdr}</MomsIngAvdr>
    <MomsBetala>${data.momsBetala}</MomsBetala>
  </Moms>
</eSKDUpload>`;
  };

  const handleDownload = () => {
    const xmlData = generateXml(data);
    const blob = new Blob([xmlData], { type: "application/xml" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "eSKDUpload.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return <button onClick={handleDownload}>Download XML</button>;
};

export default DownloadXML;
