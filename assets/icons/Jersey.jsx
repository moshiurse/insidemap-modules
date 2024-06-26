import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { Box, MenuItem, Modal, Select } from '@mui/material';
import { useState } from 'react';
import { setTeam } from '../../../store/reducers/teamReducer';
import axiosInstance from '../../utils/axios';
Jersey.propTypes = {
    className: PropTypes.string,
    position: PropTypes.string,
    index: PropTypes.number,
};

const positions = {
    a: ['CF', 'LW', 'RW', 'SF', 'LF', 'RF', 'CAM'],
    m: ['LM', 'CM', 'RM', 'CAM', 'CDM'],
    g: ['GK'],
    d: ['CB', 'LB', 'RB', 'LWB', 'RWB', 'CDM']
}
export default function Jersey(props) {
    const team = useSelector(state => state?.team?.team)
    const player = team[props.index];
    console.log(player);
    let playerList = useSelector(state => state.players);
    const dispatch = useDispatch();
    playerList = playerList.filter(pl => positions[props.position].includes(pl.positions?.first?.shortName));
    playerList = playerList.filter(pl => !team?.map(t => t.id).includes(pl.id));
    const [open, setOpen] = useState(false);

    const selectPlayer = () => {
        setOpen(true)
    }

    const onSelectPlayer = async(e) => {
        let value = e.target.value;
        let selectedPlayer = playerList.find(p => p.id == value);
        let response = await axiosInstance.get(`players/profile`, {
            params: {
                player_id: value,
                locale: 'US'
            }
        });
        response = response.data.data.playerProfile;
        let data = {
            age: Number(response.age),
            marketValue: (parseFloat(response.marketValue.replace(",", ".")) *1000),
            country: response.country,
            club: response.club
        }

        dispatch(setTeam({index: props.index, value: {...selectedPlayer, ...data}}));

        setOpen(false);
    }

    const removePlayer = (e) => {
        e.stopPropagation();
        dispatch(setTeam({index: props.index, value: {playerName: 'Select Player'}}));
    }

    return (
        <>
        <div className={`${props.className} flex flex-col items-center cursor-pointer`} onClick={selectPlayer}>
            {
                player?.id &&
                <img src={player?.playerImage} alt="" className='h-14 w-20 rounded-lg'/>
            }
            {
                !player?.id &&
                <svg width="48px" height="48px" viewBox="267 346 216 219" className="jersey-svg"><defs><radialGradient cx="52.64281%" cy="15.4758772%" fx="52.64281%" fy="15.4758772%" r="54.058955%" id="radialGradient-1"><stop offset="32.89%"></stop><stop offset="56.64%"></stop><stop offset="67.45%"></stop><stop offset="75.64%"></stop><stop offset="82.51%"></stop><stop offset="88.55%"></stop><stop offset="94.01%"></stop><stop offset="98.92%"></stop><stop offset="100%"></stop></radialGradient></defs><g id="Group" stroke="none" fill="none" transform="translate(267.000000, 346.000000)"><path d="M192.784425,22.8803537 C181.550946,20.411373 143.250129,7.81957172 139.39865,5.92668656 C118.643459,1.97631751 97.8882681,1.97631751 77.1330769,5.92668656 C73.2815982,7.73727237 34.9807816,20.411373 23.7473018,22.8803537 C11.5509524,25.5139331 2.13622651,34.9783589 0.638429213,81.5597938 C0.42445817,89.1313345 33.8039408,92.25871 39.581159,86.6623538 C41.5068984,76.3749345 42.8977101,75.8811383 44.5024929,69.6263874 C44.716464,113.98574 44.930435,179.08453 43.8605798,203.362839 C43.5396233,211.675074 66.4345248,218.259023 101.632761,218.259023 L114.578009,218.259023 C149.776246,218.259023 172.778133,211.592775 172.350191,203.362839 C171.280336,179.08453 171.494307,113.98574 171.708278,69.6263874 C173.420046,75.8811383 174.810858,76.3749345 176.629612,86.6623538 C182.40683,92.25871 215.786313,89.1313345 215.572342,81.5597938 C214.395501,34.8960595 204.980775,25.5139331 192.784425,22.8803537 Z" id="Shape" fill="#D33115"></path><path d="M118.53399,14.9018797 L96.8275862,14.9018797 L96.8275862,218.259023 L101.296552,218.259023 L114.171429,218.259023 L118.640394,218.259023 L118.640394,14.9018797 L118.53399,14.9018797 Z" id="Shape" fill="#D33115"></path><path d="M137.15468,21.2413534 C144.390148,22.3116541 151.625616,23.7112782 158.967488,25.6048872 L158.967488,213.154511 C153.328079,214.965789 145.986207,216.365414 137.15468,217.271053 L137.15468,21.2413534 Z M56.3940887,213.07218 C62.0334975,214.883459 69.3753695,216.283083 78.2068966,217.188722 L78.2068966,21.2413534 C70.9714286,22.3116541 63.7359606,23.7112782 56.3940887,25.6048872 L56.3940887,213.07218 Z" id="Shape" fill="#D33115"></path><g transform="translate(0.000000, 2.469925)" id="Shape" fill="#ffffff"><path d="M191.778495,20.4370082 C180.600878,17.9647326 142.490525,5.356127 138.658199,3.4607157 C129.290291,1.64771358 119.81593,0.658803336 110.448022,0.493984962 C107.147963,4.94408106 108.425405,9.39417716 120.348197,12.4433171 C154.093956,21.0138725 171.020063,67.1630173 171.020063,67.1630173 C172.723319,73.4261155 174.000761,73.9205706 175.916924,84.221719 C181.665413,89.8255437 215.604894,87.3955578 215.391987,79.8139126 C215.323022,77.4894857 214.772741,74.4207555 214.665998,72.1115955 C214.559255,69.8024354 213.196029,50.5208888 211.856316,43.8905502 C207.897166,24.2964327 200.394057,22.3091745 191.778495,20.4370082 Z" fill="#ffffff"></path><path d="M105.02069,0.493984962 C95.6571429,0.658646617 86.1871921,1.64661654 76.8236453,3.45789474 C72.9931034,5.26917293 34.9004926,17.9481203 23.7280788,20.4180451 C11.5980296,23.0526316 2.23448276,32.5206767 0.744827586,79.1199248 C0.532019704,86.6943609 33.7300493,89.8229323 39.4758621,84.2244361 C41.391133,73.9330827 42.7743842,73.4390977 44.3704433,67.2642857 L44.3704433,67.1819549 C44.3704433,67.1819549 61.28867,21.0766917 95.0187192,12.5142857 C106.935961,9.38571429 108.319212,4.93984962 105.02069,0.493984962 Z"></path></g><path d="M107.680788,26.4281955 C88.6344828,26.4281955 76.6108374,14.4902256 75.2275862,6.91578947 C75.0147783,5.68082707 77.5684729,5.18684211 79.4837438,3.29323308 C81.2926108,1.56428571 92.1458128,0.493984962 107.680788,0.493984962 C123.215764,0.493984962 134.068966,1.56428571 135.877833,3.29323308 C137.899507,5.18684211 140.346798,5.76315789 140.13399,6.91578947 C138.750739,14.4078947 126.727094,26.4281955 107.680788,26.4281955 Z" id="Shape" fill="#ffffff"></path><path d="M75.4403941,7.73909774 C96.7211823,4.44586466 118.640394,4.44586466 139.921182,7.73909774 C140.027586,7.49210526 140.027586,7.16278195 140.13399,6.91578947 C140.346798,5.68082707 137.793103,5.18684211 135.877833,3.29323308 C134.068966,1.56428571 123.215764,0.493984962 107.680788,0.493984962 C92.1458128,0.493984962 81.2926108,1.56428571 79.4837438,3.29323308 C77.462069,5.18684211 75.0147783,5.76315789 75.2275862,6.91578947 C75.2275862,7.16278195 75.3339901,7.49210526 75.4403941,7.73909774 Z" id="Shape" fill="#D33115"></path><path d="M135.877833,3.37556391 C137.899507,13.9962406 118.959606,22.8056391 109.489655,22.8056391 L105.871921,22.8056391 C96.4019704,22.8056391 77.355665,13.9962406 79.4837438,3.37556391 C77.5684729,5.18684211 75.1211823,5.76315789 75.3339901,6.91578947 C76.7172414,14.4078947 88.7408867,26.4281955 107.787192,26.4281955 C126.833498,26.4281955 138.857143,14.4902256 140.240394,6.91578947 C140.346798,5.68082707 137.899507,5.18684211 135.877833,3.37556391 Z" id="Shape" fill="#D33115"></path><path d="M105.871921,22.7233083 L109.489655,22.7233083 C118.959606,22.7233083 138.005911,13.9139098 135.877833,3.29323308 L135.771429,3.21090226 C133.962562,1.48195489 123.10936,0.411654135 107.574384,0.411654135 C92.0394089,0.411654135 81.1862069,1.48195489 79.3773399,3.21090226 L79.270936,3.29323308 C77.355665,13.9139098 96.4019704,22.7233083 105.871921,22.7233083 Z" id="Shape" fill=""></path></g></svg>

            }

            <div className='flex gap-1'>
                <span>{player?.playerName}</span>
                {
                    player?.id &&
                    <div onClick={(e) => removePlayer(e)}><CloseIcon/></div>
                }
            </div>
        </div>

        <Modal
            open={open}
            onClose={() => setOpen(false)}
            >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                {
                    player.id &&
                    <div className='flex flex-col gap-1'>
                        <img src={player?.playerImage} alt="" className='h-12 w-20'/>
                        <span>Name: {player?.playerName}</span>
                        <span>Club: {player?.club}</span>
                        <img src={player?.nationImage} alt="" className='h-12 w-20'/>
                        <span>Position : {player?.positions?.first?.name}</span>
                    </div>
                }

                {
                    !player.id &&
                    <Select
                        className='w-28'
                        value={player?.id}
                        label="Select Player"
                        placeholder='Select Player'
                        onChange={onSelectPlayer}
                    >
                        {
                            playerList.map(p => (
                                <MenuItem key={p.id} value={p.id}>{p.playerName}</MenuItem>
                            ))
                        }
                    </Select>
                }
            </Box>
        </Modal>
        </>
    )
}
