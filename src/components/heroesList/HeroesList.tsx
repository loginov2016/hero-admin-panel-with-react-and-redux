import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector, ActionCreator, ThunkAction, AsyncThunkAction, ThunkDispatch } from '@reduxjs/toolkit' //'reselect';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import {useHttp} from '../../hooks/http.hook';
import { fetchHeroes,/*heroesFetchingError*/heroDeleted } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import { IRootStateType } from '../../store';
import { IHeroesStateType, IHeroesType } from './heroesSlice';
//import { IActionType } from '../../actions';
//import { Action, Dispatch, UnknownAction } from 'redux';
import p from '../../../lib/print';
import { TAppDispatchType } from '../../store';
import { IActionType } from '../../actions';


const HeroesList = () => {
    //const heroes = useSelector<IStateType, IHeroesType[]>(state => state.heroes);
    /* const newState = useSelector<IRootStateType>(state => ({
        activeFilter: state.filtersReducer.activeFilter,
        heroes: state.heroesReducer.heroes
    })); */

    const filterHeroesSelector = createSelector(
        (state: IRootStateType) => state.filtersReducer.activeFilter,
        (state: IRootStateType) => state.heroesReducer.heroes,
        (filter, heroes) => {
            if( filter === 'all' ) {
                p('HeroesList createSelector - all');
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
        
    );
    
    const filteredHeroes = useSelector<IRootStateType, IHeroesType[]>(filterHeroesSelector);

    /* const filteredHeroes = useSelector<IRootStateType, IHeroesType[]>(state => {
        if( state.filtersReducer.activeFilter === 'all' ) {
            p('HeroesList useSelector - рендерится каждый раз когда нажимается кнопка фильтра all');
            p('HeroesList useSelector - нужно установить библиотеку reselect, которая будет мемоизировать значение, и не будет лишнего рендера');
            return state.heroesReducer.heroes;
        } else {
            return state.heroesReducer.heroes.filter(item => item.element === state.filtersReducer.activeFilter)
        }
    }); */

    const heroesLoadingStatus = useSelector<IRootStateType, string>(state => state.heroesReducer.heroesLoadingStatus);
    
    // Была ошибка: Argument of type 'AsyncThunkAction<IHeroesType[], void, AsyncThunkConfig>' is not assignable to parameter of type 'IActionType'
    //const dispatch = useDispatch<ThunkDispatch<IRootStateType, any, IActionType>>(); // Заменил Dispatch<IActionType> на ThunkDispatch<any, any, any> и всё с работало.
    const dispatch = useDispatch<TAppDispatchType>();
    const {request} = useHttp();

    const onDelete = useCallback( (id: number | string) => {
        //dispatch(heroesFetching); // heroesFetching() 'HEROES_FETCHING'
        // Удаление персонажа по его id
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => p(data.id, `Deleted ${data.name}`))
            .then( () => dispatch( heroDeleted(id) ) )
            //.catch( () => dispatch( heroesFetchingError() ) );
            //eslint-disable-next-line
    }, [request]);

    useEffect(() => { 
        dispatch( fetchHeroes() ); 
        /* dispatch( heroesFetching() ); //dispatch( fetchHeroes(request) );
        request("http://localhost:3001/heroes")
            //.then( data => p('data: ', data) )
            .then( data => dispatch( heroesFetched(data) ))
            .catch( () => dispatch( heroesFetchingError() )) */
        // eslint-disable-next-line
        p('useEffect => render');
    }, []);

    //p('HeroesList heroes: ', heroes);
    //p('HeroesList heroesLoadingStatus: ', heroesLoadingStatus);

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