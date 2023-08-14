import React, {useState, useEffect, useContext} from 'react';
import BoardService from '../../service/BoardService';
import MenuService from '../../service/MenuService';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import AuthContext from '../../store/auth_context';
import Editor from '../common/Editor';
//import MenuContext from '../../store/menu_context';

function CreateBoardComponent(props) {
    // 파라미터 취득
    const {id} = useParams();
    const location = useLocation();
    const authCtx = useContext(AuthContext);

    // cu 구분 파라미터
    const gubun = location.state.gubun != null ? location.state.gubun : {gubun : '_update'};

    //const menuCtx = useContext(MenuContext);
    const [menus, setMenus] = useState([]);
    const [menu, setMenu] = useState({});
    const [title, setTitle] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        /***************************
         * 메뉴 콤보박스 세팅
         ***************************/
        MenuService.getAllMenus().then((res) => {
            setMenus(res.data);
            // 첫 번째 아이템을 선택
            if (res.data.length > 0) {
                changeMenuHandler({ target: { value: res.data[0].id } });
            }
        }).catch((error) => {
            // 오류 처리
            console.error('Error fetching menus:', error);
        });

        // 생성
        if (gubun === 'create') {
            // user 정보 세팅
            setUser(authCtx.userObj);
            //return;
        } else {
            BoardService.getOneBoard(id).then(res => {
                let board = res.data;
                if (board.menu.parentId === null) {
                    board.menu.parentId = '';
                }
                setMenu(board.menu);
                setTitle(board.title);
                setEditorContent(board.contents);
                setUser(board.user);
            });
        }
        // eslint-disable-next-line
    }, []);

    const changeMenuHandler = (e) => {
        const selectedId = parseInt(e.target.value);
        const selected = menus.find(menu => menu.id === selectedId);
        setMenu(selected);
    }

    const changeTitleHandler = (e) => {
        setTitle(e.target.value);
    }

    const createBoard = (e) => {
        e.preventDefault();
        
        let board = {
            user : user,
            menu : menu,
            title : title,
            contents : editorContent
        };

        if (gubun === 'create') {
            BoardService.createBoard(board).then(res => {
                navigate(`/${menu.menuCd}`);
            });
        } else {
            BoardService.updateBoard(id, board).then(res => {
                navigate(`/read-board/${id}`)
            });
        }
        
    }

    const getTitle = () => {
        if (gubun === 'create') {
            return (<div className="row">
                <h3 className='text-center'>새글을 작성해주세요.</h3>
            </div>);
        } else {
            return (<div className="row">
                <h3 className='text-center'>{id} 글을 수정합니다.</h3>
            </div>);
        }
    }


    const handleEditorChange = (value) => {
      setEditorContent(value);
    };
  

    const cancel = () => {
        navigate('/board');
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        {getTitle()}
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>Menu</label>
                                    <select onChange={changeMenuHandler}>
                                        {menus.map(
                                            option => 
                                            <option key={option.id} value={option.id}>{option.menuNm}</option>
                                        )}
                                    </select>
                                    
                                </div>
                                <div className='form-group'>
                                    <label>Title</label>
                                    <input type="text" placeholder='title' name='title' className='form-control'
                                    value={title} onChange={changeTitleHandler}/>
                                </div>
                                <div className='form-group'>
                                <label>Content</label>
                                <Editor
                                    placeholder="내용을 입력하세요."
                                    value={editorContent}
                                    onChange={handleEditorChange}
                                />
                                </div>
                                <div className='form-group'>
                                    <label>작성자 : {user.username}</label>
                                </div>
                                <button className='btn btn-success' onClick={createBoard}>저장</button>
                                <button className='btn btn-danger' onClick={cancel}>뒤로가기</button>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBoardComponent;