import React, { useEffect, useState } from 'react'
import { Container, Table } from 'reactstrap'
import axios from 'axios';
import { AuthContext } from '../App';

const api = 'http://localhost:3001'

export default function ListNews() {

    const [news, setNews] = useState([])
    const { state } = useContext(AuthContext)

    const fetchData = () =>{
        var config ={
            headers: {
                'Content_type' : 'application/json',
                'Authorization': 'Bearer '+state.token
            }
        }

        axios.get(api + '/auth/api/v1/news', config).then(res=>{
            setNews(res.data.values)
        })
    }

    return (
        <div>
            <Container>
                <h2>Berita Gunung</h2>
                <hr />
                <Table className="table-bordered">
                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Deskripsi</th>
                            <th>Tanggal Berita</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map(news =>
                            <tr key={news.news_id}>
                                <td>{news.title}</td>
                                <td>{news.description}</td>
                                <td>{news.created_date}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}