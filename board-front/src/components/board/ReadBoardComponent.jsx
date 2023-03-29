import { useState } from "react";
import React  from 'react';
import { useEffect, useContext } from "react";
import BoardService from "../../service/BoardService";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import AuthContext from '../../store/auth_context';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const ReadBoardComponent = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const { id } = useParams();
    const [board, setBoard] = useState({});
    const [user, setUser] = useState({});
    const [loginUsername, setLoginUsername] = useState('');

    let isLogin = authCtx.isLoggedIn;

    useEffect(() => {
        BoardService.getOneBoard(id).then(res => {
            setBoard(res.data);
            setUser(res.data.user);
            console.log(res.data);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isLogin) {
            console.log('start');
            authCtx.getUser();
            setLoginUsername(authCtx.userObj.username);
        }
        // eslint-disable-next-line
    }, [isLogin]);

    const updateBoard = () => {
        navigate(`/create-board/${id}`, {state : {gubun : 'update'}});
    }

    const deleteView = async () => {
        if (window.confirm("삭제하시겠습니까?")) {
            BoardService.deleteBoard(id).then(res => {
                console.log("delete result => ", JSON.stringify(res));
                if (res.status === 200) {
                    navigate('/board');
                } else {
                    alert('글 삭제가 실패했습니다.');
                }
            })
        }
    }

    const returnBoardMenu = (menuId) => {
        let menu = null;
        if (menuId === 1) {
            menu = "자유게시판";
        } else if (menuId === 2) {
            menu = "질문과 답변 게시판";
        } else {
            menu = "타입 미지정";
        }

        return (
            <div className="row">
                <label>Board Menu : </label> {menu}
            </div>
        )
    }

    const returnDate = (cTime, uTime) => {
        return (
            <div className="row">
                <label>생성일 : [ {cTime} ] / 최종 수정일 : [ {uTime} ]</label>
            </div>
        )
    }

    const goToList = () => {
        navigate('/board');
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <h3 className='text-center'>상세보기</h3>
                        <div className='card-body'>
                            <form>
                               {returnBoardMenu(board.menu)}
                                <div className='row'>
                                    <label>Title : {board.title}</label> 
                                </div>
                                <div className='row'>
                                    <label>Contents</label>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        id='contents'
                                        data={ board.contents }
                                        disabled = 'true'

                                        onReady={ editor => {
                                        } }
                                    />
                                </div>
                                <div className='row'>
                                    <label>작성자</label> : {user.username}
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