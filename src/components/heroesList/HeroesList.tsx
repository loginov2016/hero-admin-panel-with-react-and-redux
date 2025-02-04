import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit' //'reselect';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import {useHttp} from '../../hooks/http.hook';
import { fetchHeroes, heroDeleted } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import type { IHeroesType } from './heroesSlice';
import type { IRootStateType, TAppDispatchType } from '../../store';
import p from '../../../lib/print';



const HeroesList = () => {
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

    const heroesLoadingStatus = useSelector<IRootStateType, string>(state => state.heroesReducer.heroesLoadingStatus);
    
    // Была ошибка: Argument of type 'AsyncThunkAction<IHeroesType[], void, AsyncThunkConfig>' is not assignable to parameter of type 'IActionType'
    //const dispatch = useDispatch<ThunkDispatch<IRootStateType, any, IActionType>>(); // Заменил Dispatch<IActionType> на ThunkDispatch<any, any, any> и всё с работало.
    const dispatch = useDispatch<TAppDispatchType>();
    const {request} = useHttp();

    const onDelete = useCallback( (id: number | string) => {
        // Удаление персонажа по его id
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => p(data.id, `Deleted ${data.name}`))
            .then( () => dispatch( heroDeleted(id) ) )
    }, [request]);

    useEffect(() => { 
        dispatch( fetchHeroes() ); 
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