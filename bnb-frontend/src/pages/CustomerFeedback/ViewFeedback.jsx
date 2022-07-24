import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar/Navbar";
import { Container, Box, CssBaseline, Grid } from '@mui/material';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import Button from '@mui/material/Button';

const ViewFeedback = () => {
    const userId = localStorage.getItem("email");

    const navigate = useNavigate();

    const [feedbackDetails, setFeedbackDetails] = useState([]);

    useEffect( () => {
        //call cloud function/api to get the list of all customer feedbacks 
        axios.get("https://us-central1-serverless-data-computing.cloudfunctions.net/view-feedbacks").then((res) => {
            if(res.data.success){
                setFeedbackDetails(res.data.customerfeedbacks);
            }
        });
    }, [])

    const handleBack = () => {
        navigate("/feedback");
    };

    return (
        <>
            <Navbar />
            
            <div className="feedback-heading" style={{ width: "85%", margin: "3rem auto" }}>
                <h1>Customer Feedbacks</h1>
                <Typography variant="body1" color="text.secondary">
                    All Customer Feedbacks with the type of Polarity can be viewed here.
                </Typography>
                <hr />
            </div>

            <Container component="main" maxWidth='xl' style={{ width: "85%", margin: "3rem auto" }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {feedbackDetails ? feedbackDetails.length > 0 ? feedbackDetails.map((feedbackDetail) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} >
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardContent>
                                            <div align="center">
                                                <AccountCircleIcon style={{ fontSize: 50 }} color="primary"/> 
                                                <Typography align="center" variant="body1" color="text.secondary">
                                                    {feedbackDetail.Email}
                                                </Typography>
                                            </div>
                                            <Typography align="center" gutterBottom variant="body1" component="div">
                                                {feedbackDetail.Feedback}
                                            </Typography>
                                            <Typography align="center" variant="body1" color="black" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                                                Polarity: {feedbackDetail.Polarity}
                                            </Typography>
                                            <br />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )

                            ) : "We do not have any customer feedbacks to display! Please give us our first feedback" : " Fetching customer feedbacks"}

                        </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Button
                        color="inherit"
                        onClick={handleBack}
                        size="large"
                        variant="text"
                        sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                    </Box>
                </Box>
            </Container>

        </>
    )
}

export default ViewFeedback
