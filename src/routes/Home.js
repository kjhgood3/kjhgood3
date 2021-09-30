import { useEffect, useState } from "react";
import { dbService } from 'fbase';
import Nweet from "./Nweet";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        // firestore db에서 데이터를 가져와서 출력.
        const dbNweets = await dbService.collection("nweets").get();
        let newList = [];
        dbNweets.forEach((doc) => {
            let data = doc.data();
            data.docId = doc.id;
            newList.push(data);
        });
        setNweets(newList);
    };

    useEffect(()=>{
        // getNweets();
        // firestore에서 데이터 변경이 일어나면 자동 갱신
        // onSnapshot 이벤트 한들러 함수를 사용한다.
        dbService.collection('nweets').onSnapshot((snapshot)=> {
            const newArray = snapshot.docs.map((doc)=>{
                return {docId:doc.id, ...doc.data()}
            });
            setNweets(newArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        // firebase와 같은 nosql계통의 collection은 RDB의 table이다.
        // RDB에서 row는 firebase의 Document이다. Document는 자바스크립트의 객체
        await dbService.collection('nweets').add({
            text: nweet,
            createAt: Date.now(),
            createId: userObj.uid,
            email: userObj.email,
        });

        // db저장 후 input 초기화
        setNweet('');
    }

    const onChange = (event) => {
        event.preventDefault();
        // setNweet(event.target.value);
        // event 객체를 구조분해 하기
        const {
            target : {value},
        } = event;

        setNweet(value);
    }
    
    const textStyle = {
        color : "orange", fontSize: '16pt'
    };

    return (
        <div>
            <span>Home</span>
            <form onSubmit={onSubmit}>
                <input type="text" value={nweet} onChange={onChange}/>
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {
                    // 만들어진 nweets을 활용해서 목록을 만든다.
                    nweets.map((nweet)=>{
                        return (
                            <Nweet key={nweet.docId} nweetObj={nweet} userObj={userObj}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;