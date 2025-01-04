export async function fetchUniqueImageSources(count) {
  const maximizedCount = Math.floor(count * 1.5);
  const url = `https://dog.ceo/api/breeds/image/random/${maximizedCount}`;
  const options = { mode: 'cors' };

  let imageSourcesSet = null;
  let trials = 10;

  do {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw res;
    }

    const data = await res.json();
    if (data.status.toLowerCase() !== 'success' || !data.message) {
      throw data;
    }

    imageSourcesSet = new Set(data.message);

    // Break the loop if fetched the needed number of unique images
    if (imageSourcesSet.size >= count) {
      break;
    }

    trials--;
  } while (trials > 0);

  return Array.from(imageSourcesSet).slice(0, count);
}

export default fetchUniqueImageSources;
