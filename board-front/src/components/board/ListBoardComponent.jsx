import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BoardService from '../../service/BoardService'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import AuthContext from '../../store/auth_context';

const ListBoardComponent = (props) => {
    const authCtx = useContext(AuthContext);
    const { menuCd } = useParams();
    
    const [pageNo, setPageNo] = useState(1);
    const [paging, setPaging] = useState({});
    const [boards, setBoards] = useState([]);

    let isLogin = authCtx.isLoggedIn;

    const navigate = useNavigate();

    useEffect(() => {
        BoardService.getBoard(menuCd, pageNo - 1).then((res) => {
            setPageNo(res.data.pageable.pageNumber + 1);
            setPaging(res.data);
            setBoards(res.data.content);
        });        
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isLogin) {
            authCtx.getUser();
        }
        // eslint-disable-next-line
    }, [isLogin]);

    const createBoard = () => {
        navigate('/create-board/_create', {state : {gubun : 'create'}});
    }

    const listBoard = (pageNo) => {
        if (paging.totalPages < pageNo) {
            pageNo = paging.totalPages;
        }

        BoardService.getBoard(pageNo - 1).then((res) => {
            setPageNo(res.data.pageable.pageNumber + 1);
            setPaging(res.data);
            setBoards(res.data.content);
        });
    }

    const viewPaging = () => {
        const pageCount = 5;
        let startPage = Math.floor((pageNo - 1) / pageCount) * pageCount + 1;
        let endPage = startPage + pageCount - 1;
        
        if (endPage > paging.totalPages) {
            endPage = paging.totalPages;
        }

        const pageNums = [];

        for (let i = startPage; i <= endPage; i++) {
            pageNums.push(i);
        }

        return (pageNums.map((page) => 
        <Pagination.Item key={page} active={page === pageNo} onClick={() => listBoard(page)}>
            {page}
        </Pagination.Item>
        ))
    }

    const isPagingPrev = () => {
        if(!paging.first) {
            return (
                <Pagination.Prev onClick={() => listBoard(pageNo - 1)} />
            )
        } else {
            return (
                <Pagination.Prev disabled />
            )
        }
    }

    const isPagingNext = () => {
        if(!paging.last) {
            return (
                <Pagination.Next onClick={() => listBoard(pageNo + 1)}/>
            )
        } else {
            return (
                <Pagination.Next disabled/>
            )
        }
    }

    const isMoveToFirstPage = () => {
        if (!paging.first) {
            return (
                <Pagination.First onClick={() => listBoard(1)}/>
            )
        } else {
            return (
                <Pagination.First disabled/>
            )
        }
    }

    const isMoveToLastPage = () => {
        if (!paging.last) {
            return (
                <Pagination.Last onClick={() => listBoard(paging.totalPages)}/>
            )
        } else {
            return (
                <Pagination.Last disabled/>
            )
        }
    }

    return (
        <div>
            <h2 className='text-center'>Boards List</h2>
            <div>
            {isLogin && <button className='btn btn-primary' onClick={createBoard}>글 작성</button>}
            </div>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>타이틀</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>추천수</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        boards.map(
                            board =>
                            <tr key={board.id}>
                                <td>{board.id}</td>
                                <td><Link to={`/read-board/${board.id}`}>{board.title}</Link></td>
                                <td>{board.user.username}</td>
                                <td>{board.createdDate === null ? board.createdDate : board.createdDate.toString().substr(0,10)}</td>
                                <td>{board.likes}</td>
                                <td>{board.counts}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <Pagination >
                {isMoveToFirstPage()}
                {isPagingPrev()}
                {viewPaging()}
                {isPagingNext()}
                {isMoveToLastPage()}
            </Pagination>
        </div>
    );
};

export default ListBoardComponent;