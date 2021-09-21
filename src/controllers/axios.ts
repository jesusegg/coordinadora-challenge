import axios from "axios";

const apiTalentos =
  "https://api.coordinadora.com/cm-model-testing/api/v1/talentos/";
const apiTalentosCheckpoint =
  "https://api.coordinadora.com/cm-model-testing/api/v1/talentos/checkpoint";

async function dataTalentosAxios() {
  const data = await axios.get(apiTalentos);
  return data.data.data.guias;
}

async function dataTalentosCheckpointAxios() {
  const data = await axios.get(apiTalentosCheckpoint);
  return data.data.data;
}
export const dataTalentos = dataTalentosAxios().then();
export const dataTalentosCheckpoint = dataTalentosCheckpointAxios().then();
