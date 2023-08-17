import { useState } from "react";
import React  from 'react';
import { useEffect, useContext } from "react";
import BoardService from "../../service/BoardService";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from '../../store/auth_context';
import DOMPurify from "isomorphic-dompurify"
import "react-quill/dist/quill.core.css"


const ReadBoardComponent = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [board, setBoard] = useState({});
    const [user, setUser] = useState({});
    const [menu, setMenu] = useState({});
    const [loginUsername, setLoginUsername] = useState('');

    // let isLogin = authCtx.isLoggedIn;

    useEffect(() => {
        BoardService.getOneBoard(id).then(res => {
            setBoard(res.data);
            setUser(res.data.user);
            setMenu(res.data.menu);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if ( authCtx.isLoggedIn ) {
            authCtx.getUser(); // getUserHandler 호출
        }
        // eslint-disable-next-line
    }, [authCtx.isLoggedIn]);
    
    useEffect(() => {
        if ( authCtx.isGetSuccess ) {
            setLoginUsername(authCtx.userObj.username);
        }
        // eslint-disable-next-line
    }, [authCtx.isLoggedIn, authCtx.userObj]);

    const updateBoard = () => {
        navigate(`/create-board/${id}`, {state : {gubun : 'update'}});
    }

    const deleteView = async () => {
        if (window.confirm("삭제하시겠습니까?")) {
            BoardService.deleteBoard(id).then(res => {
                if (res.status === 200) {
                    navigate(`/${menu.menuCd}`);
                } else {
                    alert('글 삭제가 실패했습니다.');
                }
            })
        }
    }

    const returnBoardMenu = (menuId) => {
        if (!!menuId) {
            return (
                <div className="row">
                    <label>Board Menu : {menu.menuNm}</label> 
                </div>
            )
        } else {
            return (
                <div className="row">
                    <label>Board Menu : 타입미지정</label> 
                </div>
            )
        }
        
    }

    const returnDate = (cTime, uTime) => {
        return (
            <div className="row">
                <label>생성일 : [ {cTime} ] / 최종 수정일 : [ {uTime} ]</label>
            </div>
        )
    }

    const goToList = () => {
        navigate(`/${menu.menuCd}`);
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <h3 className='text-center'>상세보기</h3>
                        <div className='card-body'>
                            <form>
                               {returnBoardMenu(menu.id)}
                                <div className='row'>
                                    <label>Title : {board.title}</label> 
                                </div>
                                <div
                                  className="view ql-editor" // react-quill css
                                  dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(board.contents)
                                  }}
                                />
                                <div className='row'>
                                    <label>작성자  : {user.username}</label>
                                </div>
                                {returnDate(board.createdDate, board.modifiedDate)}
                                <button className='btn btn-primary' onClick={goToList}>글 목록</button>
                                {loginUsername === user.username && <button className='btn btn-success' onClick={updateBoard}>글 수정</button>}
                                {loginUsername === user.username && <button className='btn btn-danger' onClick={deleteView}>글 삭제</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadBoardComponent;