import React, {useState, useEffect} from 'react';
import BoardService from '../../service/BoardService';
import MenuService from '../../service/MenuService';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import MenuContext from '../../store/menu_context';

function CreateBoardComponent(props) {
    // 파라미터 취득
    const {id} = useParams();
    const location = useLocation();

    // cu 구분 파라미터
    const gubun = location.state.gubun != null ? location.state.gubun : {gubun : '_update'};

    //const menuCtx = useContext(MenuContext);
    const [menus, setMenus] = useState([]);
    const [menu, setMenu] = useState({id : '1', parentId : ''});
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
      //  console.log(menuCtx.menuObj.menuNm);
        MenuService.getAllMenus().then((res) => {
            setMenus(res.data);
        });

        if (gubun === 'create') {
            return
        } else {
            BoardService.getOneBoard(id).then(res => {
                let board = res.data;
                if (board.menu.parentId === null) {
                    board.menu.parentId = '';
                }
                

                setMenu(board.menu);
                setTitle(board.title);
                setContents(board.contents);
                setUser(board.user);
            });
        }
        // eslint-disable-next-line
    }, []);

    const changeMenuHandler = (e) => {
        setMenu(e.target.value);
    }

    const changeTitleHandler = (e) => {
        setTitle(e.target.value);
    }

    const changeContentsHandler = (data) => {
        setContents(data);
    }

    const createBoard = (e) => {
        e.preventDefault();
        
        let board = {
            user : {
                id : '1',
                username : 'admin',
                password : '1234',
                email : '',
                role : 'USER',
                delYn : 'N'
            },
            menu : menu,
            title : title,
            contents : contents
        };

        console.log("board => ", JSON.stringify(board));
        if (gubun === 'create') {
            BoardService.createBoard(board).then(res => {
                navigate('/board')
            });
        } else {
            console.log('id : ' + id + '            board : ' + board.contents);
            BoardService.updateBoard(id, board).then(res => {
                navigate(`/read-board/${id}`)
            });
        }
        
    }

    const getTitle = () => {
        if (gubun === 'create') {
            console.log('create');
            return (<div className="row">
                <h3 className='text-center'>새글을 작성해주세요.</h3>
            </div>);
        } else {
            console.log('update');
            return (<div className="row">
                <h3 className='text-center'>{id} 글을 수정합니다.</h3>
            </div>);
        }
    }

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
                                            menu => 
                                            <option key={menu.id} value={menu.id}>{menu.menuNm}</option>
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
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={contents}
                                    onReady={ editor => {
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        changeContentsHandler(data);
                                    } }
                                    onBlur={ ( event, editor ) => {
                                        console.log( 'Blur.', editor );
                                    } }
                                    onFocus={ ( event, editor ) => {
                                        console.log( 'Focus.', editor );
                                    } }
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