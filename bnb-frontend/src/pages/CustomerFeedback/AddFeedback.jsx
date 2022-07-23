import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar/Navbar";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container, CssBaseline } from '@mui/material';
import axios from 'axios';
import { TextField, Grid, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';

const initialState = {
    Feedback: '',
    Email: ''
};

const AddFeedback = (props) => {

    // const userId = localStorage.getItem("email");
    const userId = "virenmalavia242@gmail.com";

    const [newPost, setNewPost] = useState(initialState);
    const [feedback, setFeedback] = useState("");
    const [sentimentScore, setSentimentScore] = useState("");
    const [polarity, setPolarity] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        console.log("effectScore: " + sentimentScore);
    }, [sentimentScore])
    
    useEffect(() => {
        console.log("effectPolarity: " + polarity);
    }, [polarity])

    const {
        register,
        formState: { errors },
        reset,
    } = useForm({
        // resolver: yupResolver(PropertySchema),
    });

    useEffect(() => {
        const post = { ...newPost, Email: userId };
        reset(post)
        setNewPost(post);
    }, []);

    const handleBack = () => {
        navigate("/");
    };

    const handleOnChange = (e) => {
        setFeedback(e.target.value);
    }

    const onSubmit = () => {
        console.log(feedback);
        if(feedback){
            const postFeedback = { ...newPost, Feedback: feedback}
            console.log("postFeedback: " + postFeedback.Feedback);
            axios.post("https://us-central1-serverless-data-computing.cloudfunctions.net/feedback-sentiment-analysis", postFeedback).then((res) => {
                console.log("response data: " + res.data);
                if(res.data.success){
                    setSentimentScore(res.data.userFeedbackData.Score);
                    setPolarity(res.data.userFeedbackData.Polarity);
                    console.log("Sentiment Score: " + sentimentScore);
                    console.log("Polarity: " + res.data.userFeedbackData.Polarity);
                    if(res.data.userFeedbackData.Polarity === "Positive"){
                        swal.fire('Feedback Submitted!', 'This review made our day. Thank your for your great feedback.', 'success')
                    } else if(res.data.userFeedbackData.Polarity === "Negative") {
                        swal.fire('Feedback Submitted!', 'Thank you for bringing this to our attention. We’re sorry you had a bad experience. We’ll strive to do better.', 'success')
                    } else if(res.data.userFeedbackData.Polarity === "Neutral") {
                        swal.fire('Feedback Submitted!', 'Thank you so much for sharing your experience with us. We hope to see you again soon.', 'success')
                    }
                    reset();
                } else {
                    swal.fire('Someting went wrong!', 'Please enter Feedback before submiting.', 'warning');
                }
            }).catch((err) => {
                console.log(err?.response?.data?.message);
                swal.fire('Someting went wrong!', 'Please try again later.', 'error');
            })
        } else {
            swal.fire('Someting went wrong!', 'Please enter Feedback before submiting.', 'warning');
        }
    };

    return (
        <>
            <Navbar />
            
            <div className="feedback-heading" style={{ width: "85%", margin: "3rem auto" }}>
                <h1>Customer Feedback</h1>
                <hr />
            </div>

            <Grid container>
                <Box component="form" sx={{ width: '100%', mt: 5 }} > 
                        <React.Fragment>
                            <Container component="main" maxWidth="sm" sx={{ mt: 5 }}>
                                <CssBaseline />
                                <div style={{width: "100%",
                                    backgroundColor: "#fff",
                                    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                                    padding: "1rem",
                                    boxShadow: "rgb(100 116 139 / 12%) 0px 10px 15px",
                                    borderRadius: 8,}}>
                                    <Box
                                        sx={{
                                            marginTop: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >

                                        <Grid container spacing={2}>
                                            <Grid item xs={12} textAlign="center">
                                                <Typography>Please share your experience with us...</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    {...register("feedback")}
                                                    variant="outlined"
                                                    fullWidth
                                                    name="feedback"
                                                    label="Enter your Feedback here"
                                                    id="feedback"
                                                    multiline
                                                    rows={3}
                                                    error={!!errors.feedback}
                                                    helperText={errors.feedback ? errors.feedback.message : ""}
                                                    onChange={handleOnChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    
                                </div>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={onSubmit}>
                                        Submit
                                    </Button>
                                </Box>
                            </Container>
                        </React.Fragment>
                </Box>
            </Grid>
        </>
    )
}

export default AddFeedback;