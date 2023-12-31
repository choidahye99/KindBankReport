import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Header from "../component/Header";
import ReportSrc from '../assets/report.png'
import * as styles from "../styles/Styles"
import SlideShow from "../component/SlideShow";
import ModalContent from "../component/ModalContent"
import Modal from "react-modal";
import articleData from "../services/articleDataApi";
import {useNavigate} from "react-router-dom";


export default function Main(props) {

    const navigate = useNavigate();

    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateString = year + '-' + month + '-' + day;

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [articles, setArticles] = useState([]);

    const tempDate = "2023-08-20";

    useEffect(() => {
        // 컴포넌트가 마운트되었을 때 스크롤 숨김
        document.body.style.overflow = "hidden";

        // 데이터 가져옴
        articleData(tempDate)
            .then((data) => {
                setArticles(data)

            })
            .catch((error) =>
                console.log("data error: " + error)
            )

        // 컴포넌트가 언마운트되었을 때 스크롤 복원
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <>
            <Header/>
            <styles.MainBgContainer className="main-bg">
                <Container>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        style={{
                            overlay: {
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.75)'
                            },
                            content: {
                                position: 'absolute',
                                top: '10%',
                                left: '30%',
                                right: '30%',
                                bottom: '10%',
                                border: 'none',
                                background: 'rgba(244, 238, 221, 1)',
                                overflow: 'auto',
                                WebkitOverflowScrolling: 'touch',
                                borderRadius: '15px',
                                outline: 'none',
                                padding: '4% 4% 1% 4%',
                                boxShadow: '8px 16px 16px hsl(0deg 0% 0% / 0.25)',
                            }
                        }}
                        className="non-scroll">
                        <ModalContent setModalIsOpen={setModalIsOpen} textAlign={"center"} articles={articles}/>
                    </Modal>
                    <Row className="justify-content-around">
                        <Col sm={4}>
                            <Row sm={10}>
                                <styles.AnimatedImage src={ReportSrc} onClick={() => {
                                    setModalIsOpen(true)
                                }}/>
                            </Row>
                            <Row sm={2} className="justify-content-center" style={{marginTop: `10%`}}>

                                <styles.Button onClick={() => {
                                    navigate("/report/"+tempDate, {
                                        state: {
                                            articles: articles,
                                        }
                                    });
                                }
                                } className="btn-grad kb-font-color">
                                    오늘의
                                    <span className="btn-mini"> 금융 리포트 </span>
                                    확인
                                </styles.Button>

                            </Row>
                        </Col>
                        <Col sm={5}>
                            <SlideShow/>
                        </Col>
                    </Row>
                </Container>
            </styles.MainBgContainer>
        </>
    );
}
