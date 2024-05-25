import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import {useHttp} from '../../hooks/http.hook';
import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import { IStateType, IHeroesType, IFilterType } from '../../reducers';
import { IActionType } from '../../actions';
import { Dispatch } from 'redux';
import p from '../../../lib/print';

const HeroesList = () => {
    const heroes = useSelector<IStateType, IHeroesType[]>(state => state.heroes);
    const filteredHeroes = useSelector<IStateType, IHeroesType[]>(state => state.filteredHeroes);
    const heroesLoadingStatus = useSelector<IStateType, string>(state => state.heroesLoadingStatus);
    const dispatch = useDispatch<Dispatch<IActionType>>();
    const {request} = useHttp();

    const onDelete = useCallback( (id: number | string) => {
        dispatch(heroesFetching());
        // Удаление персонажа по его id
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => p(data.id, `Deleted ${data.name}`))
            .then( () => dispatch( heroDeleted(id) ) )
            .catch( () => dispatch( heroesFetchingError() ) );
            //eslint-disable-next-line
    }, [request]);

    useEffect(() => {
        dispatch( heroesFetching() );
        request("http://localhost:3001/heroes")
            //.then( data => p('data: ', data) )
            .then( data => dispatch( heroesFetched(data) ))
            .catch( () => dispatch( heroesFetchingError() ))
        // eslint-disable-next-line
        p('useEffect => render');
    }, []);

    p('HeroesList heroes: ', heroes);
    p('HeroesList heroesLoadingStatus: ', heroesLoadingStatus);

    if(heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr: IHeroesType[]) => {
        if(arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }
        return arr.map( ({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);

    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;