const {Client} = require('@opensearch-project/opensearch');

const host = "엔드포인트에서 https://를 제외한 search로 시작하는 곳부터 입력 ex) search-test-opensearch-~~~~~~~.com";
const protocol = 'https';
const auth = "your id:your pass";

const client = new Client({
    node: protocol + '://' + auth + '@' + host
});

const get_query = async () => {
    const query = {
        query: {
            match_all: {}
        }
    };

    const response = await client.search({
        index: 'test-index', body: query
    });

    console.log(response.body.hits.hits)
}

const get_custom_key_query = async () => {
    const columns = ["id", "title"]
    const search = {"id": "aaa", "title": "bbb"}

    let must_params = []
    columns.forEach(function (data) {
        must_params.push(JSON.parse(`{
        "match": {
            "${data}": "${search[data]}"
        }
    }`));
    })
    const query = {
        query: {
            bool: {
                must: must_params
            }
        }
    };

    const response = await client.search({
        index: 'test-index', body: query
    });

    console.log(response.body.hits.hits)
}

const index_query = async () => {
    const id = "20";

    const document = {
        id: "rrr",
        title: "ccc",
        price: 6.1,
        create_date: "2019-01-11"
    };

    const response = await client.index({
        id: id,
        index: "test-index",
        body: document,
        refresh: true,
    });

    console.log(response)
}

const bulk_index_query = async () => {
    const bulk_data = [
        {index: {_index: "test-index", _id: 21}},
        {
            id: "rrr",
            title: "ccc",
            price: 6.1,
            create_date: "2019-01-11"
        },
        {index: {_index: "test-index", _id: 22}},
        {
            id: "rrr",
            title: "ccc",
            price: 6.1,
            create_date: "2019-01-11"
        }
    ]

    const response = await client.bulk({body: bulk_data});

    console.log(response)
}

const update_query = async () => {
    const id = "1";

    const document = {
        "doc" : {
            id: "hhh"
        }
    };

    const response = await client.update({
        id: id,
        index: "test-index",
        body: document,
    });

    console.log(response)
}

const bulk_update_query = async () => {
    const bulk_data = [
        { "update": { "_index": "test-index", "_id": "1" } },
        { "doc" : { "title": "jhh" } },
        { "update": { "_index": "test-index", "_id": "2" } },
        { "doc" : { "title": "jhh" } }
    ]

    const response = await client.bulk({body: bulk_data});

    console.log(response)
}

const delete_query = async () => {
    const id = "20";

    const response = await client.delete({
        id: id,
        index: "test-index"
    });

    console.log(response)
}

const bulk_delete_query = async () => {
    const bulk_data = [
        { "delete": { "_index": "test-index", "_id": "21" } },
        { "delete": { "_index": "test-index", "_id": "22" } }
    ]

    const response = await client.bulk({body: bulk_data});

    console.log(response)
}