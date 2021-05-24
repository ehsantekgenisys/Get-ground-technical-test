export const basicHeaders = {
    accept: 'application/json',
    'Content-Type': 'application/json',
};

export const PostData = async ({ page, itemsPerPage, filters }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        page, itemsPerPage, filters
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("http://nyx.vima.ekt.gr:3000/api/books", requestOptions)
    return response.status === 200 ? response.json() : response.statusText;

};

