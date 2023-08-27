import React from 'react';
import {BottomNavigation, BottomNavigationAction, Container, Grid, Paper, Typography} from "@mui/material";
import {all} from "./shoyaku";
import {ArrowBack, ArrowForward, Check} from "@mui/icons-material";


const shuffleArr = (src: number[]): number[] => {
    const dst = src.slice();
    let i = src.length;
    while (i > 0) {
        i--;
        const j = Math.floor(Math.random() * (i + 1));
        [dst[i], dst[j]] = [dst[j], dst[i]];
    }
    return dst;
};

export const Root = () => {
    const [shuffleIds, setShuffleIds] = React.useState<number[]>(shuffleArr(all.map(v => v.id)));
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [isShowAnswer, setIsShowAnswer] = React.useState<boolean>(false);

    const a = all.find(v => v.id === shuffleIds[currentPage]) ?? all[0];

    const rankToStars = (rank: number) => {
        const stars: string[] = [];
        for(let i= 0; i < rank; i++) {
            stars.push("⭐️");
        }
        return stars
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        {a.group}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        {a.生薬名}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        頻出度: {rankToStars(a.頻出度).length ? rankToStars(a.頻出度) : "-"}
                    </Typography>
                </Grid>
                {isShowAnswer &&
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            効果効能
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {a.効果効能}
                        </Typography>
                    </Grid>
                }
            </Grid>

            {/*<Grid container alignItems={'center'} justifyContent={"space-between"}>*/}
            {/*    <Grid item>*/}
            {/*        <Button size="large" variant="outlined" onClick={() => {*/}
            {/*            if (currentPage === 0) {*/}
            {/*                return;*/}
            {/*            }*/}
            {/*            setIsShowAnswer(false)*/}
            {/*            setCurrentPage(currentPage - 1)}*/}
            {/*        }>前</Button>*/}
            {/*    </Grid>*/}

            {/*    <Grid item>*/}
            {/*        <Button size="large" variant="contained" color="success" onClick={() => {*/}
            {/*            setIsShowAnswer(!isShowAnswer)*/}
            {/*        }}>詳細</Button>*/}
            {/*    </Grid>*/}

            {/*    <Grid item>*/}
            {/*        <Button size="large" variant="contained" onClick={() => {*/}
            {/*            if (currentPage === shuffleIds.length - 1) {*/}
            {/*                return;*/}
            {/*            }*/}
            {/*            setIsShowAnswer(false)*/}
            {/*            setCurrentPage(currentPage + 1)}*/}
            {/*        }>次</Button>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation>
                    <BottomNavigationAction showLabel={true} label="前" icon={<ArrowBack />} onClick={() => {
                        if (currentPage === 0) {
                            return;
                        }
                        setIsShowAnswer(false)
                        setCurrentPage(currentPage - 1)}
                    } />
                    <BottomNavigationAction showLabel={true} label="詳細" icon={<Check color={"success"}/>} onClick={() => {
                        setIsShowAnswer(!isShowAnswer)
                    }}/>
                    <BottomNavigationAction showLabel={true} label="次" icon={<ArrowForward />} onClick={() => {
                        if (currentPage === shuffleIds.length - 1) {
                            return;
                        }
                        setIsShowAnswer(false)
                        setCurrentPage(currentPage + 1)}
                    }/>
                </BottomNavigation>
            </Paper>

        </Container>
    );
};
