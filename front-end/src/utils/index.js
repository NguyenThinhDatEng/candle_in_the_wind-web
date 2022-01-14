import { serviceURL } from "../services/base.services";

export function getStrapiMedia(link) {
  return serviceURL + link;
}
